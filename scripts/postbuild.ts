import { copyFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/**
 * GitHub Pages has no rewrite rules: any path that does not exist on disk is
 * answered with `404.html`. Pointing that file at React Router's SPA fallback
 * lets the client router take over for paths that were not prerendered.
 */
const clientDir = new URL("../build/client/", import.meta.url);
const fallback = new URL("__spa-fallback.html", clientDir);
const notFound = new URL("404.html", clientDir);

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
