import { Link } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { ModeToggle } from "~/components/mode-toggle";
import { localizePath } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";

export function SiteHeader() {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to={localizePath("/", locale)}
            className="font-heading shrink-0 text-sm font-semibold tracking-tight"
          >
            {t("site.name")}
          </Link>
          <Link
            to={localizePath("/posts", locale)}
            className="text-muted-foreground hover:text-foreground font-heading text-sm transition-colors"
          >
            {t("nav.posts")}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
