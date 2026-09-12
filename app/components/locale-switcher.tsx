import { Link, useLocation } from "react-router";

import { buttonVariants } from "~/components/ui/button";
import {
  alternateLocale,
  languageTags,
  localeFromPathname,
  localizePath,
} from "~/lib/i18n";
import { useTranslate } from "~/lib/use-i18n";
import { cn } from "~/lib/utils";

/**
 * Links to the same page in the other locale, so switching language keeps you
 * where you are.
 */
export function LocaleSwitcher() {
  const t = useTranslate();
  const { pathname } = useLocation();
  const target = alternateLocale(localeFromPathname(pathname));

  return (
    <Link
      to={localizePath(pathname, target)}
      hrefLang={languageTags[target]}
      aria-label={t("lang.switch")}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "px-2 text-muted-foreground",
      )}
    >
      {t("lang.label")}
    </Link>
  );
}
