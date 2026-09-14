# gyk.me

Static site for [gyk.me](https://gyk.me) — prerendered with React Router, styled
with shadcn/ui and Tailwind CSS, bilingual (English / 中文), with an interactive
WebGL backdrop, built and deployed to GitHub Pages.

## Stack

| Concern        | Choice                                                      |
| -------------- | ----------------------------------------------------------- |
| UI             | React 19                                                    |
| Framework      | React Router 8 (framework mode, `ssr: false` + `prerender`) |
| Styling        | Tailwind CSS v4 + shadcn/ui (Base UI primitives)            |
| Backdrop       | Hand-written WebGL fragment shader (no 3D library)          |
| Bundler        | Vite 8 (React Router's build pipeline)                      |
| Package runner | Bun (install, scripts, lockfile)                            |
| Lint / format  | oxlint / oxfmt                                              |
| Hosting        | GitHub Pages (custom domain, deployed via Actions)          |

## Getting started

```bash
bun install
bun run dev      # http://localhost:5173
```

## Scripts

| Script                 | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| `bun run dev`          | Dev server with HMR                                    |
| `bun run build`        | Prerender the site into `build/client`                 |
| `bun run preview`      | Serve the built output locally                         |
| `bun run typecheck`    | React Router typegen + `tsc --noEmit`                  |
| `bun run lint`         | oxlint                                                 |
| `bun run lint:fix`     | oxlint with autofixes                                  |
| `bun run format`       | oxfmt (also sorts imports, Tailwind classes, pkg.json) |
| `bun run format:check` | Verify formatting without writing                      |

## Static generation

`react-router.config.ts` sets `ssr: false`, so there is no runtime server, and
`prerender: true`, so every static route in `app/routes.ts` is rendered to HTML
at build time — in both locales:

```
build/
├── client/                       # deploy this directory
│   ├── index.html                # prerendered "/"                 (en)
│   ├── posts/index.html          # prerendered "/posts"            (en)
│   ├── posts/weft/index.html     # prerendered "/posts/weft"       (en)
│   ├── zh/…                      # the same three, in Chinese
│   ├── 404.html                  # SPA fallback, written by scripts/postbuild.ts
│   └── assets/                   # hashed JS/CSS/fonts
└── server/                       # build-time render bundle (not deployed)
```

Because rendering happens at build time, route `loader`s run during the build
and their data is baked into the HTML. Route `action`/`headers` exports are
rejected: there is no runtime server to run them.

Adding a page means adding a route module and an entry in `app/routes.ts`:

```ts
// app/routes.ts
export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
```

Routes with dynamic params need their paths listed in `prerender`; the posts
below avoid that by being static:

```ts
// react-router.config.ts
export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const slugs = await getPostSlugs();
    return [...getStaticPaths(), ...slugs.map((slug) => `/posts/${slug}`)];
  },
} satisfies Config;
```

## Posts

The site's one parameterized-looking route is deliberately not parameterized.
`app/routes.ts` declares each post as a static path — `posts/weft`, and its
`zh` mirror — because only static routes are prerendered, and an article that
exists only after the client router boots is not worth writing. A new post
means one entry per locale in `app/routes.ts`, one one-line route module per
locale, and its content:

```
app/content/posts.ts     # the registry: slug, date, per-locale title/summary
app/content/<slug>.tsx   # the prose itself, as a per-locale component
app/pages/post.tsx       # PostArticle — the shared article shell
app/pages/post-<slug>.tsx# meta for that post, plus its page component
```

The bodies are React rather than Markdown so prose lives in the typed graph:
a missing locale or a broken component fails `tsc` and the build, and prose
styling is one `.post` block in `app/app.css` rather than a Markdown pipeline.
That block is written by hand instead of pulling in a typography plugin,
because this site is one font and a handful of elements.

## Languages

English is the default locale at unprefixed paths; Chinese mirrors it under
`/zh`. Both trees are prerendered, so every page is real HTML with the matching
`<html lang>`, plus `canonical` and reciprocal `hreflang` alternates.

- `app/lib/i18n.ts` — locale helpers, BCP 47 tags, and the message catalogues.
  The Chinese catalogue is typed `Record<MessageKey, string>`, so a missing
  translation fails `tsc` instead of rendering a blank string.
- `app/lib/use-i18n.ts` — `useLocale()` and `useTranslate()`. The locale is a
  function of the URL, so prerendering, `meta()` functions, and the client
  router always agree without shared state.
- `app/pages/*` holds the page implementations; `app/routes/**` are the
  per-locale route modules that re-export them. React Router requires unique
  route ids, so each locale needs its own module — they are one line each.
- The header switcher links to the same page in the other locale.

To add a locale: add its tag and prefix in `app/lib/i18n.ts`, add a catalogue,
and add a `prefix("<code>", [...])` branch to `app/routes.ts` with one thin
route module per page.

## Theming

Light and dark tokens live in `app/app.css` (`:root` and `.dark`). The choice is
`light | dark | system`, stored in `localStorage` under `gyk-me:theme`:

- A small inline script in the root layout applies the stored theme **before the
  first paint**, so a dark-mode reload never flashes white.
- `useTheme()` (`app/lib/use-theme.ts`) reads it through `useSyncExternalStore`
  with a `system` server snapshot, which keeps the prerendered markup valid
  while hydrating, and follows OS changes while in `system` mode.
- The header dropdown (`app/components/mode-toggle.tsx`) writes the choice.

`<html lang>`, `canonical`, and `hreflang` all come from the root layout, so new
routes inherit them automatically.

## Icons

`public/` holds three generated files, all declaring the same mark: "YK" set in
Geist Bold — the heading face the site already loads — on a rounded tile, in the
`--foreground` / `--background` pair from `app/app.css`.

- `favicon.svg` is the one that counts where it is supported. It carries a
  `prefers-color-scheme: dark` rule that swaps tile and mark, so the icon inverts
  with the OS rather than the site's own stored theme.
- `favicon.ico` (16/32/48) is the fallback for browsers without SVG icons, and is
  fixed to the light-mode artwork.
- `apple-touch-icon.png` (180) is full bleed and opaque, since iOS applies its
  own mask; the glyph is inset a little further to survive it.

They are committed binaries rather than build artifacts, and the shapes are the
real glyph outlines instead of a traced approximation: regenerating them means
converting Geist to SVG paths (Google Fonts' static Geist 700). No generator
script is checked in yet.

## Backdrop

`app/components/cyber-background.tsx` renders a perspective grid behind
everything: a fixed, `pointer-events-none` canvas painted by a full-screen
triangle and a fragment shader that intersects a ray per pixel with the ground
plane. No 3D library and no dependency — the geometry, the anti-aliasing, and
the falloff are all in the shader.

Design constraints it holds to:

- **Hairline but deep.** Lines are about one pixel wide — the anti-aliasing
  width comes from each pixel's own footprint on the plane — so they stay crisp
  at any depth. Because they cover so few pixels the ink itself is deep: a
  saturated cyan on near-black, a deep slate blue on white. Weight and colour
  live in `GRID.lineWidth` and `PALETTE`, and both fade with distance so content
  stays dominant.
- **Never scrolls, never drifts.** The wrapper is `position: fixed`, and nothing
  moves on its own: the camera is a pure function of the pointer, so a still
  mouse means a still page. There is no time uniform in the shader at all.
- **Idle costs nothing.** No render loop runs by default. Frames are drawn on
  demand — while the pointer is easing toward its target, or while a ripple is
  alive — and the loop stops itself once everything has settled.
- **Interactive.** The camera leans toward the pointer, and a click drops a
  ripple that expands outward through the grid. Up to four coexist and a new
  click never cancels an older ring; only the oldest retires when one more
  arrives. Screen positions are unprojected in JS, so each ripple stays anchored
  to the world plane rather than to the viewport.
- **Quiet when asked.** `prefers-reduced-motion` freezes it to a single still
  frame and ignores both pointer and clicks; rendering also pauses while the tab
  is hidden.
- **Fail-soft.** No WebGL, no backdrop — never an error. Prerendering emits an
  empty element, since the scene is built in an effect on the client only.
- **Bounded cost.** The backing store is capped at 1600px wide and 1.5 DPR, so
  the shader never runs at full retina resolution.

## Components

shadcn/ui components live in `app/components/ui` and are owned by this repo —
edit them freely. Add more with:

```bash
bunx shadcn@latest add dialog separator
```

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`build/client` to GitHub Pages. `scripts/postbuild.ts` copies React Router's
`__spa-fallback.html` to `404.html` so unknown paths still boot the client
router. `.github/workflows/ci.yml` runs format check, lint, typecheck, and build
on pushes and pull requests.

The custom domain is configured in the repository's Pages settings (no `CNAME`
file is committed).
