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

import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { buttonVariants } from "~/components/ui/button";
import {
  absoluteUrl,
  alternateLocale,
  canonicalPath,
  languageTags,
  locales,
  localizePath,
  openGraphLocales,
  siteName,
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
    <html lang={languageTags[locale]} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Applies the stored theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="canonical" href={absoluteUrl(canonicalPath(pathname))} />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:url"
          content={absoluteUrl(canonicalPath(pathname))}
        />
        <meta property="og:locale" content={openGraphLocales[locale]} />
        <meta
          property="og:locale:alternate"
          content={openGraphLocales[alternateLocale(locale)]}
        />
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
        <link
          rel="sitemap"
          type="application/xml"
          href={absoluteUrl("/sitemap.xml")}
        />
        {/* The `.ico` comes first so browsers without SVG icon support still
            get a mark; `favicon.svg` adapts to the OS theme on its own. */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
  const t = useTranslate();

  return (
    <div className="flex min-h-svh flex-col">
      <a href="#content" className="skip-link">
        {t("skip.content")}
      </a>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <SiteFooter />
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
        <pre className="w-full overflow-x-auto rounded-sm border p-4 text-xs">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
