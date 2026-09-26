import { copyFile, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { canonicalPagePaths, robotsTxt, sitemapXml } from "../app/lib/seo";

/**
 * GitHub Pages has no rewrite rules: any path that does not exist on disk is
 * answered with `404.html`. Pointing that file at React Router's SPA fallback
 * lets the client router take over for paths that were not prerendered.
 *
 * Also writes `robots.txt` and `sitemap.xml`. The sitemap is checked against
 * the prerendered `index.html` files so a new page cannot ship unlisted.
 */
const clientDir = new URL("../build/client/", import.meta.url);
const fallback = new URL("__spa-fallback.html", clientDir);
const notFound = new URL("404.html", clientDir);

async function prerenderedPaths(dir: URL, prefix: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && entry.name !== "assets")
      .map((entry) => {
        const next =
          prefix === "" ? `/${entry.name}` : `${prefix}/${entry.name}`;
        return prerenderedPaths(new URL(`${entry.name}/`, dir), next);
      }),
  );
  const paths = nested.flat();

  if (entries.some((entry) => entry.isFile() && entry.name === "index.html")) {
    paths.push(prefix === "" ? "/" : `${prefix}/`);
  }

  return paths;
}

function pathGap(expected: string[], actual: string[]): string {
  const built = new Set(actual);
  const listed = new Set(expected);
  const missingFromBuild = expected.filter((path) => !built.has(path));
  const missingFromSitemap = actual.filter((path) => !listed.has(path));

  return [
    missingFromBuild.length > 0
      ? `in the sitemap but not prerendered: ${missingFromBuild.join(", ")}`
      : "",
    missingFromSitemap.length > 0
      ? `prerendered but not in the sitemap: ${missingFromSitemap.join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("; ");
}

try {
  await stat(fallback);
} catch {
  throw new Error(
    `Missing ${fileURLToPath(fallback)} — is \`prerender\` still set in react-router.config.ts?`,
  );
}

await copyFile(fallback, notFound);
console.log(
  `postbuild: ${fileURLToPath(notFound)} <- ${fileURLToPath(fallback)}`,
);

const gap = pathGap(
  canonicalPagePaths(),
  await prerenderedPaths(clientDir, ""),
);
if (gap !== "") {
  throw new Error(
    `Sitemap does not match the prerendered site (${gap}). Update indexPages() in app/lib/seo.ts.`,
  );
}

const robots = new URL("robots.txt", clientDir);
const sitemap = new URL("sitemap.xml", clientDir);
await writeFile(robots, robotsTxt());
await writeFile(sitemap, sitemapXml());
console.log(
  `postbuild: wrote ${fileURLToPath(robots)} and ${fileURLToPath(sitemap)}`,
);
