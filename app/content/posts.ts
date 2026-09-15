/**
 * The post registry.
 *
 * Everything here is imported at build time, so a post that fails to typecheck
 * fails the build instead of shipping an empty page. No `loader` is involved:
 * with `ssr: false` the client router owns navigation, and reading a post
 * straight out of this module keeps one code path for the prerendered HTML and
 * for the browser.
 */

import type { Locale } from "~/lib/i18n";

import { sensorActuator } from "./sensor-actuator";
import { weft } from "./weft";

/** The copy a listing needs, in one locale. */
export type PostLocale = {
  title: string;
  /** Shown on the index, and used as the page's `description`. */
  summary: string;
};

/** One post: an identity, a date, and a body per locale. */
export type Post = {
  /** URL segment: `/posts/<slug>`, and `/zh/posts/<slug>`. */
  slug: string;
  /** Publication date, `YYYY-MM-DD`. Rendered as written, so it never shifts. */
  date: string;
  /** Both locales are required; the site has no fallback content. */
  locales: Record<Locale, PostLocale>;
  /** The article body per locale, as a component. */
  Body: Record<Locale, () => React.JSX.Element>;
};

/** Newest first — the order the index renders them in. */
export const posts: Post[] = [sensorActuator, weft];

export function postBySlug(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
