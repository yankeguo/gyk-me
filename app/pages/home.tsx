import { type MetaArgs } from "react-router";
import { Link } from "react-router";

import { posts } from "~/content/posts";
import { localeFromPathname, localizePath, translator } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";

export function homeMeta({ location }: MetaArgs) {
  const t = translator(localeFromPathname(location.pathname));
  return [
    { title: t("meta.home.title") },
    { name: "description", content: t("meta.home.description") },
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

export function HomePage() {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        {t("site.name")}
      </h1>

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
