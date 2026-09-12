import { useEffect, useRef } from "react";

/**
 * Fixed, low-contrast WebGL backdrop: a neon grid receding into the distance,
 * computed per pixel in a fragment shader. Nothing here is a dependency — the
 * whole effect is a full-screen triangle and ~60 lines of GLSL.
 *
 * Nothing animates on its own: the camera position is a pure function of the
 * pointer, so the grid only moves when the mouse moves. Clicks add ripples that
 * accumulate instead of replacing each other. Frames are rendered on demand —
 * while the pointer is easing or a ripple is alive — so an untouched page costs
 * no GPU work at all.
 *
 * It is decorative and client-only: prerendering emits an empty fixed element,
 * the scene is built in an effect, and everything bails out when WebGL is
 * missing. Under `prefers-reduced-motion` it stays a still image and ignores
 * both pointer and clicks.
 */

const CAMERA = {
  height: 1,
  focal: 1.5,
  pitch: 0.26,
  pitchResponse: 0.05,
  yawResponse: 0.12,
  parallax: 0.6,
};

const GRID = {
  spacing: 1,
  fineSpacing: 0.2,
  fineWeight: 0.35,
  falloff: 0.05,
};

const RIPPLE = {
  /** How many rings can coexist; the oldest is retired when one more arrives. */
  max: 4,
  lifetime: 2.6,
  speed: 3.5,
  width: 0.9,
  strength: 0.6,
  fade: 1.4,
};

const PALETTE = {
  dark: { color: [0.45, 0.85, 1], alpha: 0.15 },
  light: { color: [0.12, 0.32, 0.48], alpha: 0.12 },
};

/** Keeps the backing store small: this is a soft background, not a picture. */
const MAX_BACKING_WIDTH = 1600;

/** Pointer easing stops once it is this close, so the loop can go idle. */
const SETTLE_EPSILON = 0.0005;

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec3 uColor;
uniform float uAlpha;
uniform vec2 uRipples[${RIPPLE.max}];
uniform float uRippleAges[${RIPPLE.max}];

const float camHeight = ${CAMERA.height.toFixed(4)};
const float focal = ${CAMERA.focal.toFixed(4)};
const float pitchBase = ${CAMERA.pitch.toFixed(4)};
const float pitchResponse = ${CAMERA.pitchResponse.toFixed(4)};
const float yawResponse = ${CAMERA.yawResponse.toFixed(4)};
const float parallax = ${CAMERA.parallax.toFixed(4)};
const float spacing = ${GRID.spacing.toFixed(4)};
const float fineSpacing = ${GRID.fineSpacing.toFixed(4)};
const float fineWeight = ${GRID.fineWeight.toFixed(4)};
const float falloff = ${GRID.falloff.toFixed(4)};
const float rippleSpeed = ${RIPPLE.speed.toFixed(4)};
const float rippleWidth = ${RIPPLE.width.toFixed(4)};
const float rippleStrength = ${RIPPLE.strength.toFixed(4)};
const float rippleFade = ${RIPPLE.fade.toFixed(4)};

vec3 rayDirection(vec2 uv, float yaw, float pitch) {
  vec3 dir = normalize(vec3(uv.x, uv.y - pitch, -focal));
  float c = cos(yaw);
  float s = sin(yaw);
  return vec3(c * dir.x + s * dir.z, dir.y, -s * dir.x + c * dir.z);
}

float gridMask(vec2 p, float cell, float aa) {
  vec2 q = abs(fract(p / cell - 0.5) - 0.5) * cell;
  return 1.0 - smoothstep(0.0, aa * 1.4, min(q.x, q.y));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;

  float yaw = uPointer.x * yawResponse;
  float pitch = pitchBase - uPointer.y * pitchResponse;
  vec3 origin = vec3(uPointer.x * parallax, camHeight, 0.0);
  vec3 direction = rayDirection(uv, yaw, pitch);

  // Only the ground plane below the camera is drawn; the rest stays clear.
  if (direction.y >= -0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float travelled = -origin.y / direction.y;
  vec3 hit = origin + direction * travelled;

  // One pixel's footprint on the plane, so lines stay a pixel wide at any depth.
  float footprint = max(travelled * 2.0 / (uResolution.y * abs(direction.y)), 0.0015);
  float coarse = gridMask(hit.xz, spacing, footprint);
  float fine = gridMask(hit.xz, fineSpacing, footprint * 0.8) * fineWeight;

  float glow = (coarse + fine) * exp(-travelled * falloff);

  // Every live ripple keeps expanding, so old clicks stay visible.
  for (int i = 0; i < ${RIPPLE.max}; i++) {
    float age = uRippleAges[i];
    if (age >= 0.0) {
      float ahead = (distance(hit.xz, uRipples[i]) - age * rippleSpeed) * rippleWidth;
      glow += exp(-ahead * ahead) * exp(-age * rippleFade) * rippleStrength;
    }
  }

  float alpha = clamp(glow, 0.0, 1.0) * uAlpha;
  gl_FragColor = vec4(uColor * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // The scene is decorative, so a broken shader just means no backdrop — but
    // it should never fail quietly while someone is editing it.
    console.warn(
      `cyber-background: ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader failed to compile\n${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

type Ripple = { x: number; z: number; start: number };

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const attribute = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "uResolution"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      color: gl.getUniformLocation(program, "uColor"),
      alpha: gl.getUniformLocation(program, "uAlpha"),
      ripples: gl.getUniformLocation(program, "uRipples"),
      rippleAges: gl.getUniformLocation(program, "uRippleAges"),
    };

    // oxlint-disable-next-line react-hooks/rules-of-hooks -- WebGL's useProgram, not a hook
    gl.useProgram(program);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const ripples: Ripple[] = [];
    const rippleOrigins = new Float32Array(RIPPLE.max * 2);
    const rippleAges = new Float32Array(RIPPLE.max);
    let frame = 0;
    let previous = 0;
    let palette = PALETTE.light;

    const draw = (now: number) => {
      for (let i = 0; i < RIPPLE.max; i++) {
        const ripple = ripples[i];
        rippleOrigins[i * 2] = ripple?.x ?? 0;
        rippleOrigins[i * 2 + 1] = ripple?.z ?? 0;
        rippleAges[i] = ripple ? (now - ripple.start) / 1000 : -1;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform3f(
        uniforms.color,
        palette.color[0],
        palette.color[1],
        palette.color[2],
      );
      gl.uniform1f(uniforms.alpha, palette.alpha);
      gl.uniform2fv(uniforms.ripples, rippleOrigins);
      gl.uniform1fv(uniforms.rippleAges, rippleAges);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const isSettled = () =>
      pointer.x === pointer.targetX && pointer.y === pointer.targetY;

    const keepGoing = (now: number) => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        if ((now - ripples[i].start) / 1000 > RIPPLE.lifetime) {
          ripples.splice(i, 1);
        }
      }
      return ripples.length > 0 || !isSettled();
    };

    const render = (now: number) => {
      frame = 0;
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      const ease = Math.min(1, delta * 4);
      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;
      if (Math.abs(pointer.targetX - pointer.x) < SETTLE_EPSILON) {
        pointer.x = pointer.targetX;
      }
      if (Math.abs(pointer.targetY - pointer.y) < SETTLE_EPSILON) {
        pointer.y = pointer.targetY;
      }

      draw(now);
      if (keepGoing(now)) frame = requestAnimationFrame(render);
    };

    /** Renders only while something is actually changing. */
    const requestFrame = () => {
      if (frame || motion.matches || document.hidden) return;
      previous = performance.now();
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(
        Math.min(window.devicePixelRatio || 1, 1.5),
        MAX_BACKING_WIDTH / Math.max(width, 1),
      );
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    };

    /** World-space point where a screen position meets the grid plane. */
    const groundPoint = (clientX: number, clientY: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const uvx = (2 * clientX - width) / height;
      const uvy = (height - 2 * clientY) / height;

      const yaw = pointer.x * CAMERA.yawResponse;
      const pitch = CAMERA.pitch - pointer.y * CAMERA.pitchResponse;
      const scale = Math.hypot(uvx, uvy - pitch, CAMERA.focal);
      const x = uvx / scale;
      const y = (uvy - pitch) / scale;
      const z = -CAMERA.focal / scale;
      if (y >= -0.002) return null;

      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);
      const dx = cos * x + sin * z;
      const dz = -sin * x + cos * z;
      const travelled = -CAMERA.height / y;
      return {
        x: pointer.x * CAMERA.parallax + dx * travelled,
        z: dz * travelled,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = 1 - (event.clientY / window.innerHeight) * 2;
      requestFrame();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (motion.matches) return;
      const point = groundPoint(event.clientX, event.clientY);
      if (!point) return;

      ripples.push({ x: point.x, z: point.z, start: performance.now() });
      // Old rings keep going; only the oldest gives way when at capacity.
      while (ripples.length > RIPPLE.max) ripples.shift();
      requestFrame();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else requestFrame();
    };

    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        ripples.length = 0;
        draw(performance.now());
      }
    };

    // Repaint whenever the theme flips so the static frame matches the palette.
    const syncPalette = () => {
      palette = document.documentElement.classList.contains("dark")
        ? PALETTE.dark
        : PALETTE.light;
      draw(performance.now());
    };

    const observer = new MutationObserver(syncPalette);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    syncPalette();
    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", stop);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", stop);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
