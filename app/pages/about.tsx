import { type MetaArgs } from "react-router";

import { Separator } from "~/components/ui/separator";
import { localeFromPathname, translator } from "~/lib/i18n";
import { useTranslate } from "~/lib/use-i18n";

export function aboutMeta({ location }: MetaArgs) {
  const t = translator(localeFromPathname(location.pathname));
  return [
    { title: t("meta.about.title") },
    { name: "description", content: t("meta.about.description") },
  ];
}

export function AboutPage() {
  const t = useTranslate();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        {t("about.title")}
      </h1>
      <Separator className="my-6" />
      <div className="text-muted-foreground flex max-w-prose flex-col gap-4">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
      </div>
    </div>
  );
}
