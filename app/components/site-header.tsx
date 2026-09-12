import { NavLink } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { ModeToggle } from "~/components/mode-toggle";
import { localizePath } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";
import { cn } from "~/lib/utils";

export function SiteHeader() {
  const locale = useLocale();
  const t = useTranslate();

  const links = [
    { to: localizePath("/", locale), label: t("nav.home"), end: true },
    { to: localizePath("/about", locale), label: t("nav.about"), end: false },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4">
        <NavLink
          to={localizePath("/", locale)}
          className="font-heading shrink-0 text-sm font-semibold tracking-tight"
        >
          {t("site.name")}
        </NavLink>
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-0.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "bg-muted text-foreground",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <span aria-hidden="true" className="bg-border mx-1 h-4 w-px" />
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
