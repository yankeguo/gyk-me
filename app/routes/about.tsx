import { Separator } from "~/components/ui/separator";

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About · gyk.me" },
    { name: "description", content: "About Yanke Guo." },
  ];
}

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        About
      </h1>
      <Separator className="my-6" />
      <div className="text-muted-foreground flex max-w-prose flex-col gap-4">
        <p>
          I build software — mostly backend services, developer tooling, and the
          occasional web front end. This site collects what I want to keep
          around.
        </p>
        <p>
          It is a fully static site: prerendered at build time by React Router,
          styled with shadcn/ui and Tailwind CSS, and deployed to GitHub Pages.
        </p>
      </div>
    </div>
  );
}
