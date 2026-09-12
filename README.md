# gyk.me

Static site for [gyk.me](https://gyk.me) — prerendered with React Router, styled
with shadcn/ui and Tailwind CSS, bilingual (English / 中文), built and deployed
to GitHub Pages.

## Stack

| Concern        | Choice                                                      |
| -------------- | ----------------------------------------------------------- |
| UI             | React 19                                                    |
| Framework      | React Router 8 (framework mode, `ssr: false` + `prerender`) |
| Styling        | Tailwind CSS v4 + shadcn/ui (Base UI primitives)            |
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
│   ├── index.html                # prerendered "/"        (en)
│   ├── about/index.html          # prerendered "/about"   (en)
│   ├── zh/index.html             # prerendered "/zh"      (zh)
│   ├── zh/about/index.html       # prerendered "/zh/about" (zh)
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
  route("posts/:slug", "routes/post.tsx"),
] satisfies RouteConfig;
```

Routes with dynamic params need their paths listed in `prerender`:

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

## Components

shadcn/ui components live in `app/components/ui` and are owned by this repo —
edit them freely. Add more with:

```bash
bunx shadcn@latest add dialog dropdown-menu
```

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`build/client` to GitHub Pages. `scripts/postbuild.ts` copies React Router's
`__spa-fallback.html` to `404.html` so unknown paths still boot the client
router. `.github/workflows/ci.yml` runs format check, lint, typecheck, and build
on pushes and pull requests.

The custom domain is configured in the repository's Pages settings (no `CNAME`
file is committed).
