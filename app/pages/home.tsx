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
    <div className="mx-auto flex max-w-3xl flex-col px-4 pt-10 pb-16 sm:pt-12">
      <div className="flex items-center gap-5">
        <img
          src="/avatar.jpg"
          alt=""
          width={64}
          height={64}
          className="ring-border size-16 shrink-0 rounded-full object-cover ring-1"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
          <h1 className="font-heading shrink-0 text-4xl font-medium tracking-tight">
            {t("site.name")}
          </h1>
          {/* Fills the spare width so the short name and address read as one masthead. */}
          <span
            aria-hidden="true"
            className="bg-border hidden h-px flex-1 sm:block"
          />
          <div className="flex items-baseline gap-3 sm:shrink-0">
            <a
              href={`mailto:${siteEmail}`}
              className="text-muted-foreground hover:text-foreground font-mono text-sm tracking-wide underline-offset-4 transition-colors hover:underline"
            >
              {siteEmail}
            </a>
            <a
              href="/smime.pem"
              title={t("smime.certificate")}
              className="text-muted-foreground/70 hover:text-foreground font-mono text-xs tracking-wide underline-offset-4 transition-colors hover:underline"
            >
              S/MIME
            </a>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground mt-10">{t("posts.empty")}</p>
      ) : (
        <ul className="mt-10 flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1.5">
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
              <p className="text-muted-foreground w-full text-[0.9375rem] leading-relaxed">
                {post.locales[locale].summary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
