import type { MetaArgs } from "react-router";

import { weft } from "~/content/weft";
import { localeFromPathname, siteName } from "~/lib/i18n";
import { PostArticle, PostBackLink } from "~/pages/post";

export function weftPostMeta({ location }: MetaArgs) {
  const locale = localeFromPathname(location.pathname);

  return [
    { title: `${weft.locales[locale].title} — ${siteName}` },
    { name: "description", content: weft.locales[locale].summary },
  ];
}

export function PostPage() {
  return (
    <PostArticle post={weft}>
      <PostBackLink />
    </PostArticle>
  );
}
