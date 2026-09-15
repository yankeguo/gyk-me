import type { ReactNode } from "react";
import { Link } from "react-router";

import type { Post } from "~/content/posts";
import { localizePath } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";

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

/**
 * The article shell — title, date, summary, prose — shared by every post.
 * `children` is the footnote, which belongs to the route rather than to the
 * shell: a post's links are its own.
 */
export function PostArticle({
  post,
  children,
}: {
  post: Post;
  children?: ReactNode;
}) {
  const locale = useLocale();
  const { title, summary } = post.locales[locale];
  const Body = post.Body[locale];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">
          {title}
        </h1>
        <time dateTime={post.date} className="text-muted-foreground text-xs">
          {formatDate(post.date, locale)}
        </time>
        <p className="text-muted-foreground max-w-prose text-sm">{summary}</p>
      </header>

      <div className="post mt-10">
        <Body />
      </div>

      {children ? (
        <footer className="mt-12 border-t pt-6">{children}</footer>
      ) : null}
    </article>
  );
}

/** The way back to the index, under the prose. */
export function PostBackLink() {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <Link
      to={localizePath("/posts", locale)}
      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
    >
      ← {t("post.back")}
    </Link>
  );
}

/**
 * Where a post's factual claims can be checked. Sits under the back link,
 * quieter than the prose, because it is a footnote and not an argument.
 */
export function PostSources({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
      {children}
    </p>
  );
}
