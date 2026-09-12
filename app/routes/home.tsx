import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "gyk.me" },
    {
      name: "description",
      content: "Yanke Guo — projects, notes, and experiments.",
    },
  ];
}

const stack = [
  {
    title: "Prerendered",
    description:
      "Every route is rendered to HTML at build time, so there is no runtime server.",
  },
  {
    title: "React Router",
    description:
      "Framework mode with file-based route modules, typegen, and code splitting.",
  },
  {
    title: "shadcn/ui",
    description:
      "Base UI primitives on Tailwind CSS v4 design tokens, owned in this repo.",
  },
  {
    title: "Bun",
    description:
      "Installs dependencies, runs scripts, and freezes the lockfile.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <section className="flex flex-col items-start gap-4">
        <Badge variant="secondary">Static site · prerendered</Badge>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Yanke Guo
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Welcome to gyk.me — a small corner of the internet for my projects,
          notes, and experiments.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/about" className={cn(buttonVariants({ size: "lg" }))}>
            About me
            <ArrowRight data-icon="inline-end" />
          </Link>
          <a
            href="https://github.com/yankeguo"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        {stack.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
