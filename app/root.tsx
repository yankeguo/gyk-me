import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import {
  absoluteUrl,
  canonicalPath,
  languageTags,
  locales,
  localizePath,
} from "~/lib/i18n";
import { themeInitScript } from "~/lib/theme";
import { useLocale, useTranslate } from "~/lib/use-i18n";
import { cn } from "~/lib/utils";

import type { Route } from "./+types/root";

import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const { pathname } = useLocation();

  return (
    <html lang={languageTags[locale]}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Applies the stored theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="canonical" href={absoluteUrl(canonicalPath(pathname))} />
        {locales.map((alternate) => (
          <link
            key={alternate}
            rel="alternate"
            hrefLang={languageTags[alternate]}
            href={absoluteUrl(canonicalPath(localizePath(pathname, alternate)))}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(canonicalPath(localizePath(pathname, "en")))}
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-svh antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Rendered into the SPA fallback document (`build/client/404.html`), which is
 * served for any path that was not prerendered.
 */
export function HydrateFallback() {
  const t = useTranslate();

  return (
    <div className="text-muted-foreground flex min-h-svh items-center justify-center text-sm">
      {t("loading")}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="text-muted-foreground mx-auto max-w-3xl px-4 py-6 text-sm">
          gyk.me
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const locale = useLocale();
  const t = useTranslate();

  let message = t("error.title");
  let details = t("error.generic");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : t("error.status");
    details =
      error.status === 404 ? t("error.notFound") : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-4 py-24">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        {message}
      </h1>
      <p className="text-muted-foreground">{details}</p>
      <Link to={localizePath("/", locale)} className={cn(buttonVariants())}>
        {t("error.back")}
      </Link>
      {stack ? (
        <pre className="w-full overflow-x-auto rounded-lg border p-4 text-xs">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
