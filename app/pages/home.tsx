import { Link, type MetaArgs } from "react-router";

import { posts } from "~/content/posts";
import { formatDate } from "~/lib/format-date";
import {
  localeFromPathname,
  localizePath,
  siteEmail,
  translator,
} from "~/lib/i18n";
import { documentMeta } from "~/lib/meta";
import { useLocale, useTranslate } from "~/lib/use-i18n";

export function homeMeta({ location }: MetaArgs) {
  const t = translator(localeFromPathname(location.pathname));
  return documentMeta({
    title: t("meta.home.title"),
    description: t("meta.home.description"),
  });
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
        {/* The serif ink sits a few pixels above its line box; the nudge
            recenters the name and the contact line on the avatar. */}
        <div className="flex min-w-0 translate-y-[3px] flex-col gap-3.5">
          <h1 className="font-heading text-4xl font-medium tracking-tight">
            {t("site.name")}
          </h1>
          {/* The mono stem sits left of the serif. A small indent lines the address up with the name. */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pl-1">
            <a
              href={`mailto:${siteEmail}`}
              className="text-muted-foreground hover:text-foreground font-mono text-sm tracking-wide underline-offset-4 transition-colors hover:underline"
            >
              {siteEmail}
            </a>
            <span className="inline-flex items-baseline gap-x-4">
              <a
                href="/smime.pem"
                title={t("smime.certificate")}
                className="text-muted-foreground/70 hover:text-foreground font-mono text-xs tracking-wide underline-offset-4 transition-colors hover:underline"
              >
                S/MIME
              </a>
              <a
                href="/gpg.asc"
                title={t("gpg.publicKey")}
                className="text-muted-foreground/70 hover:text-foreground font-mono text-xs tracking-wide underline-offset-4 transition-colors hover:underline"
              >
                GPG
              </a>
              <a
                href="https://github.com/sponsors/yankeguo"
                target="_blank"
                rel="noreferrer"
                aria-label={t("sponsor.link")}
                title={t("sponsor.link")}
                className="text-muted-foreground/70 hover:text-foreground font-mono text-xs tracking-wide underline-offset-4 transition-colors hover:underline"
              >
                {t("sponsor.label")}
              </a>
            </span>
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
              <p className="text-muted-foreground w-full text-[0.9375rem] leading-relaxed text-pretty">
                {post.locales[locale].summary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
