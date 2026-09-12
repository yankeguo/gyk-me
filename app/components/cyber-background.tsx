import { useEffect, useRef } from "react";

/**
 * Fixed, low-contrast WebGL backdrop: a neon grid receding into the distance,
 * computed per pixel in a fragment shader. Nothing here is a dependency — the
 * whole effect is a full-screen triangle and ~60 lines of GLSL.
 *
 * It is decorative and client-only: prerendering emits an empty fixed element,
 * the scene is built in an effect, and everything bails out when WebGL is
 * missing. It leans toward the pointer, answers clicks with a ripple that
 * travels through the grid, and holds perfectly still for
 * `prefers-reduced-motion`.
 */

const CAMERA = {
  height: 1,
  focal: 1.5,
  pitch: 0.26,
  pitchResponse: 0.05,
  yawResponse: 0.12,
  parallax: 0.6,
  speed: 0.55,
};

const GRID = {
  spacing: 1,
  fineSpacing: 0.2,
  fineWeight: 0.35,
  falloff: 0.05,
};

const RIPPLE_LIFETIME = 2.4;

const PALETTE = {
  dark: { color: [0.45, 0.85, 1], alpha: 0.15 },
  light: { color: [0.12, 0.32, 0.48], alpha: 0.12 },
};

/** Keeps the backing store small: this is a soft background, not a picture. */
const MAX_BACKING_WIDTH = 1600;

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uColor;
uniform float uAlpha;
uniform vec2 uRipple;
uniform float uRippleAge;

const float camHeight = ${CAMERA.height.toFixed(4)};
const float focal = ${CAMERA.focal.toFixed(4)};
const float pitchBase = ${CAMERA.pitch.toFixed(4)};
const float pitchResponse = ${CAMERA.pitchResponse.toFixed(4)};
const float yawResponse = ${CAMERA.yawResponse.toFixed(4)};
const float parallax = ${CAMERA.parallax.toFixed(4)};
const float speed = ${CAMERA.speed.toFixed(4)};
const float spacing = ${GRID.spacing.toFixed(4)};
const float fineSpacing = ${GRID.fineSpacing.toFixed(4)};
const float fineWeight = ${GRID.fineWeight.toFixed(4)};
const float falloff = ${GRID.falloff.toFixed(4)};

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
  vec3 origin = vec3(uPointer.x * parallax, camHeight, -uTime * speed);
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
  float travel = 0.8 + 0.2 * sin(hit.z * 0.5 + uTime * 1.6);

  float glow = (coarse + fine) * travel * exp(-travelled * falloff);

  if (uRippleAge >= 0.0) {
    float ahead = (distance(hit.xz, uRipple) - uRippleAge * 3.5) * 0.9;
    glow += exp(-ahead * ahead) * exp(-uRippleAge * 1.4) * 0.6;
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
      time: gl.getUniformLocation(program, "uTime"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      color: gl.getUniformLocation(program, "uColor"),
      alpha: gl.getUniformLocation(program, "uAlpha"),
      ripple: gl.getUniformLocation(program, "uRipple"),
      rippleAge: gl.getUniformLocation(program, "uRippleAge"),
    };

    // oxlint-disable-next-line react-hooks/rules-of-hooks -- WebGL's useProgram, not a hook
    gl.useProgram(program);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const ripple = { x: 0, z: 0, start: Number.NEGATIVE_INFINITY };
    let elapsed = 0;
    let frame = 0;
    let previous = 0;
    let palette = PALETTE.light;

    const draw = () => {
      const age = elapsed - ripple.start;
      const active = age >= 0 && age < RIPPLE_LIFETIME;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform3f(
        uniforms.color,
        palette.color[0],
        palette.color[1],
        palette.color[2],
      );
      gl.uniform1f(uniforms.alpha, palette.alpha);
      gl.uniform2f(uniforms.ripple, ripple.x, ripple.z);
      gl.uniform1f(uniforms.rippleAge, active ? age : -1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const render = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      elapsed += delta;

      const ease = Math.min(1, delta * 4);
      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;

      draw();
      frame = requestAnimationFrame(render);
    };

    const start = () => {
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
      draw();
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

      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);
      const dx = cos * x + sin * z;
      const dz = -sin * x + cos * z;
      if (y >= -0.002) return null;

      const distance = -CAMERA.height / y;
      return {
        x: pointer.x * CAMERA.parallax + dx * distance,
        z: -elapsed * CAMERA.speed + dz * distance,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = 1 - (event.clientY / window.innerHeight) * 2;
    };

    const onPointerDown = (event: PointerEvent) => {
      const point = groundPoint(event.clientX, event.clientY);
      if (!point) return;
      ripple.x = point.x;
      ripple.z = point.z;
      ripple.start = elapsed;
      if (motion.matches) draw();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        draw();
      } else {
        start();
      }
    };

    // Repaint the static frame whenever the theme flips, and keep the running
    // scene in sync with the palette.
    const syncPalette = () => {
      palette = document.documentElement.classList.contains("dark")
        ? PALETTE.dark
        : PALETTE.light;
      if (!frame) draw();
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

    start();

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
