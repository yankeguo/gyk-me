/**
 * GitHub lives here on purpose: a quiet mark at the edge of the footer, with
 * the sponsor link beside it, not a call to action competing with the page.
 */
import { useTranslate } from "~/lib/use-i18n";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function SiteFooter() {
  const t = useTranslate();

  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-6">
        <span className="font-mono text-xs tracking-wide">gyk.me</span>
        <div className="-mr-1 flex items-center gap-2">
          <a
            href="https://github.com/sponsors/yankeguo"
            target="_blank"
            rel="noreferrer"
            aria-label={t("sponsor.link")}
            title={t("sponsor.link")}
            className="hover:text-foreground px-1 font-mono text-xs tracking-wide underline-offset-4 transition-colors hover:underline"
          >
            {t("sponsor.label")}
          </a>
          <a
            href="https://github.com/yankeguo"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="text-muted-foreground/60 hover:text-foreground focus-visible:ring-ring/50 rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <GithubMark className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
