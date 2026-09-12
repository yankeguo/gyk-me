# gyk.me

Static site for [gyk.me](https://gyk.me) — prerendered with React Router, styled
with shadcn/ui and Tailwind CSS, built and deployed to GitHub Pages.

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
at build time:

```
build/
├── client/                  # deploy this directory
│   ├── index.html           # prerendered "/"
│   ├── about/index.html     # prerendered "/about"
│   ├── 404.html             # SPA fallback, written by scripts/postbuild.ts
│   └── assets/              # hashed JS/CSS/fonts
└── server/                  # build-time render bundle (not deployed)
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

## Components

shadcn/ui components live in `app/components/ui` and are owned by this repo —
edit them freely. Add more with:

```bash
bunx shadcn@latest add dialog dropdown-menu
```

Theming uses Tailwind v4 design tokens in `app/app.css` (`:root` and `.dark`).
The site currently ships light mode only; wiring a `.dark` toggle is a matter of
setting the class on `<html>`.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`build/client` to GitHub Pages. `scripts/postbuild.ts` copies React Router's
`__spa-fallback.html` to `404.html` so unknown paths still boot the client
router. `.github/workflows/ci.yml` runs format check, lint, typecheck, and build
on pushes and pull requests.

The custom domain is configured in the repository's Pages settings (no `CNAME`
file is committed).
