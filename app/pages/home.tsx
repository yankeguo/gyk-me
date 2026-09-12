import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, type MetaArgs } from "react-router";

import { buttonVariants } from "~/components/ui/button";
import { localeFromPathname, localizePath, translator } from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";
import { cn } from "~/lib/utils";

export function homeMeta({ location }: MetaArgs) {
  const t = translator(localeFromPathname(location.pathname));
  return [
    { title: t("meta.home.title") },
    { name: "description", content: t("meta.home.description") },
  ];
}

export function HomePage() {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <section className="flex flex-col items-start gap-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          {t("site.name")}
        </h1>
        <p className="text-muted-foreground max-w-prose">{t("home.intro")}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={localizePath("/about", locale)}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {t("home.cta.about")}
            <ArrowRight data-icon="inline-end" />
          </Link>
          <a
            href="https://github.com/yankeguo"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("home.cta.github")}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>
      </section>
    </div>
  );
}
