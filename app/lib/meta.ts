import type { MetaDescriptor } from "react-router";

/**
 * Title, description, and the social tags that must repeat them.
 * `og:url`, `og:locale`, and `og:site_name` are emitted by the root layout,
 * because they come from the URL rather than from the page copy.
 */
export function documentMeta({
  title,
  description,
  type = "website",
  published,
}: {
  title: string;
  description: string;
  type?: "website" | "article";
  /** `YYYY-MM-DD`. Emitted as `article:published_time`. */
  published?: string;
}): MetaDescriptor[] {
  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: "summary" },
  ];

  if (published !== undefined) {
    meta.push({ property: "article:published_time", content: published });
  }

  return meta;
}
