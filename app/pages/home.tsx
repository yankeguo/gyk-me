import { type MetaArgs } from "react-router";

import { localeFromPathname, translator } from "~/lib/i18n";
import { useTranslate } from "~/lib/use-i18n";

export function homeMeta({ location }: MetaArgs) {
  const t = translator(localeFromPathname(location.pathname));
  return [
    { title: t("meta.home.title") },
    { name: "description", content: t("meta.home.description") },
  ];
}

export function HomePage() {
  const t = useTranslate();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <section className="flex flex-col items-start gap-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          {t("site.name")}
        </h1>
        <p className="text-muted-foreground max-w-prose">{t("home.intro")}</p>
      </section>
    </div>
  );
}
