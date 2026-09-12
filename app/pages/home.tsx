import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, type MetaArgs } from "react-router";

import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  localeFromPathname,
  localizePath,
  translator,
  type MessageKey,
} from "~/lib/i18n";
import { useLocale, useTranslate } from "~/lib/use-i18n";
import { cn } from "~/lib/utils";

const stack = [
  {
    title: "home.stack.prerendered.title",
    description: "home.stack.prerendered.description",
  },
  {
    title: "home.stack.router.title",
    description: "home.stack.router.description",
  },
  {
    title: "home.stack.shadcn.title",
    description: "home.stack.shadcn.description",
  },
  {
    title: "home.stack.bun.title",
    description: "home.stack.bun.description",
  },
] satisfies { title: MessageKey; description: MessageKey }[];

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
        <Badge variant="secondary">{t("home.badge")}</Badge>
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

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        {stack.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{t(item.title)}</CardTitle>
              <CardDescription>{t(item.description)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
