import type { MetaArgs } from "react-router";
import { Link } from "react-router";

import { posts } from "~/content/posts";
import { localeFromPathname, localizePath, siteName } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";

export function postListMeta({ location }: MetaArgs) {
  const zh = localeFromPathname(location.pathname) === "zh";

  return [
    { title: `${zh ? "文章" : "Posts"} — ${siteName}` },
    {
      name: "description",
      content: zh
        ? `关于我做了什么、以及为什么,写得长一点的那些。目前 ${posts.length} 篇。`
        : `Notes on what I build and why — ${posts.length} of them.`,
    },
  ];
}

function formatDate(date: string, locale: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) return date;

  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function PostsPage() {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {t("posts.title")}
        </h1>
        <p className="text-muted-foreground max-w-prose">{t("posts.intro")}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t("posts.empty")}</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1">
              <Link
                to={localizePath(`/posts/${post.slug}`, locale)}
                className="font-heading hover:text-muted-foreground text-lg font-medium tracking-tight transition-colors"
              >
                {post.locales[locale].title}
              </Link>
              <time
                dateTime={post.date}
                className="text-muted-foreground text-xs"
              >
                {formatDate(post.date, locale)}
              </time>
              <p className="text-muted-foreground max-w-prose text-sm">
                {post.locales[locale].summary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
