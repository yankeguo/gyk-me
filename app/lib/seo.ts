/**
 * `robots.txt` and `sitemap.xml`.
 *
 * The site is prerendered, so these are plain files written into `build/client`
 * (and served from the dev server). Paths come from the post registry plus the
 * home page — the same set `scripts/postbuild.ts` checks against the HTML that
 * was actually rendered. A new non-post page has to be added to `indexPages`.
 */

import { posts } from "~/content/posts";
import {
  absoluteUrl,
  canonicalPath,
  languageTags,
  locales,
  localizePath,
  siteUrl,
} from "~/lib/i18n";

type Page = {
  /** Locale-less path, e.g. `/` or `/posts/weft`. */
  path: string;
  /** `YYYY-MM-DD`, when the page has a real publication date. */
  lastmod?: string;
};

/** Home, then each post, newest first. */
export function indexPages(): Page[] {
  const lastmod = posts.reduce<string | undefined>(
    (newest, post) =>
      newest === undefined || post.date > newest ? post.date : newest,
    undefined,
  );

  return [
    { path: "/", lastmod },
    ...posts.map((post) => ({
      path: `/posts/${post.slug}`,
      lastmod: post.date,
    })),
  ];
}

/** Every canonical path the sitemap should list, both locales. */
export function canonicalPagePaths(): string[] {
  return indexPages().flatMap((page) =>
    locales.map((locale) => canonicalPath(localizePath(page.path, locale))),
  );
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function alternateLinks(path: string): string {
  const links = locales.map((locale) => {
    const href = absoluteUrl(canonicalPath(localizePath(path, locale)));
    return `    <xhtml:link rel="alternate" hreflang="${languageTags[locale]}" href="${escapeXml(href)}" />`;
  });
  const xDefault = absoluteUrl(canonicalPath(localizePath(path, "en")));
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />`,
  );
  return links.join("\n");
}

export function sitemapXml(): string {
  const urls = indexPages().flatMap((page) =>
    locales.map((locale) => {
      const loc = absoluteUrl(canonicalPath(localizePath(page.path, locale)));
      const lastmod = page.lastmod
        ? `\n    <lastmod>${page.lastmod}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n${alternateLinks(page.path)}\n  </url>`;
    }),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    urls.join("\n"),
    `</urlset>`,
    ``,
  ].join("\n");
}

/** Allow every crawler, and point it at the sitemap. */
export function robotsTxt(): string {
  return [
    `# ${siteUrl} — crawlers are welcome.`,
    `User-agent: *`,
    `Allow: /`,
    ``,
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ``,
  ].join("\n");
}
