import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import {
  defineConfig,
  type Connect,
  type Plugin,
  type ViteDevServer,
} from "vite";

const seoModule = fileURLToPath(new URL("./app/lib/seo.ts", import.meta.url));

/**
 * Serves `/robots.txt` and `/sitemap.xml` during development. Production copies
 * are written by `scripts/postbuild.ts` from the same module.
 */
function seoFiles(): Plugin {
  const middleware = (server: ViteDevServer): Connect.NextHandleFunction => {
    return (req, res, next) => {
      const url = req.url?.split("?")[0];
      if (url !== "/robots.txt" && url !== "/sitemap.xml") {
        next();
        return;
      }

      void (async () => {
        try {
          const mod = (await server.ssrLoadModule(seoModule)) as {
            robotsTxt: () => string;
            sitemapXml: () => string;
          };
          const body =
            url === "/robots.txt" ? mod.robotsTxt() : mod.sitemapXml();
          res.setHeader(
            "Content-Type",
            url === "/robots.txt"
              ? "text/plain; charset=utf-8"
              : "application/xml; charset=utf-8",
          );
          res.end(body);
        } catch (error) {
          res.statusCode = 500;
          res.end(
            error instanceof Error
              ? error.message
              : "Failed to build SEO files",
          );
        }
      })();
    };
  };

  return {
    name: "gyk-seo-files",
    configureServer(server) {
      server.middlewares.use(middleware(server));
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), seoFiles()],
  resolve: {
    tsconfigPaths: true,
  },
});
