import type { Config } from "@react-router/dev/config";

export default {
  // Static site: render every route to HTML at build time and ship no runtime
  // server. Paths that are not prerendered fall back to the SPA fallback
  // document (copied to `404.html` by the build script).
  // https://reactrouter.com/how-to/pre-rendering
  ssr: false,
  prerender: true,
} satisfies Config;
