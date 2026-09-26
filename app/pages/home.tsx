import { type MetaArgs } from "react-router";
import { Link } from "react-router";

import { posts } from "~/content/posts";
import {
  localeFromPathname,
  localizePath,
  siteEmail,
  translator,
} from "~/lib/i18n";
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
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-16">
      <div className="flex items-center gap-5 border-b pb-8">
        <img
          src="/avatar.jpg"
          alt=""
          width={64}
          height={64}
          className="ring-border size-16 shrink-0 rounded-full object-cover ring-1"
        />
        <div className="min-w-0">
          <h1 className="font-heading text-4xl font-medium tracking-tight">
            {t("site.name")}
          </h1>
          <a
            href={`mailto:${siteEmail}`}
            className="text-muted-foreground hover:text-foreground mt-1 inline-block font-mono text-sm tracking-wide underline-offset-4 transition-colors hover:underline"
          >
            {siteEmail}
          </a>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground pt-8">{t("posts.empty")}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-2 border-b py-6">
              <time
                dateTime={post.date}
                className="text-muted-foreground font-mono text-xs tracking-wide tabular-nums"
              >
                {formatDate(post.date, locale)}
              </time>
              <Link
                to={localizePath(`/posts/${post.slug}`, locale)}
                className="font-heading hover:text-primary text-xl font-medium tracking-tight transition-colors"
              >
                {post.locales[locale].title}
              </Link>
              <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
                {post.locales[locale].summary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
