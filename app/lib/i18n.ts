/**
 * Locale plumbing and message catalogues.
 *
 * Kept free of React imports so it can also be used from `meta()` functions and
 * from `react-router.config.ts` while prerendering.
 */

export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Chinese lives under `/zh`; English is the unprefixed default locale. */
const localePrefixes: Partial<Record<Locale, string>> = { zh: "/zh" };

/** BCP 47 tags for `<html lang>` and `hreflang`. */
export const languageTags: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export const siteUrl = "https://gyk.me";

/** Used in `<title>`; the catalogues also carry it as `site.name`. */
export const siteName = "Y.-K. Guo";

function hasLocalePrefix(pathname: string, locale: Locale): boolean {
  const prefix = localePrefixes[locale];
  if (prefix === undefined) return false;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function localeFromPathname(pathname: string): Locale {
  return hasLocalePrefix(pathname, "zh") ? "zh" : defaultLocale;
}

/** `/zh/about` -> `/about`; unprefixed paths are returned unchanged. */
export function stripLocale(pathname: string): string {
  const prefix = localePrefixes[localeFromPathname(pathname)];
  if (prefix === undefined) return pathname;
  const rest = pathname.slice(prefix.length);
  return rest === "" ? "/" : rest;
}

/** `/about` in `zh` -> `/zh/about`. */
export function localizePath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);
  const prefix = localePrefixes[locale];
  if (prefix === undefined) return base;
  return base === "/" ? prefix : `${prefix}${base}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export function absoluteUrl(pathname: string): string {
  return `${siteUrl}${pathname}`;
}

/**
 * GitHub Pages serves directory indexes and 301-redirects `/about` to
 * `/about/`, so the canonical form of every non-root URL carries a trailing
 * slash. Normalizing keeps `canonical` and `hreflang` reciprocal across pages.
 */
export function canonicalPath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

const en = {
  "site.name": "Y.-K. Guo",
  "home.intro":
    "Welcome to gyk.me — a small corner of the internet for my projects, notes, and experiments.",
  "home.posts": "Read the posts",
  "meta.home.title": "Y.-K. Guo",
  "meta.home.description": "Y.-K. Guo — projects, notes, and experiments.",
  "theme.label": "Theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.system": "System",
  "lang.label": "中文",
  "lang.switch": "Switch to Chinese",
  "nav.posts": "Posts",
  "posts.title": "Posts",
  "posts.intro": "Longer notes on what I build and why.",
  "posts.empty": "Nothing published yet.",
  "post.back": "All posts",
  loading: "Loading…",
  "error.title": "Oops!",
  "error.status": "Error",
  "error.notFound": "The requested page could not be found.",
  "error.generic": "An unexpected error occurred.",
  "error.back": "Back home",
} as const;

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  "site.name": "Y.-K. Guo",
  "home.intro": "欢迎来到 gyk.me —— 这里放我的项目、笔记和一些尝试。",
  "home.posts": "阅读文章",
  "meta.home.title": "Y.-K. Guo",
  "meta.home.description": "Y.-K. Guo 的个人站点 —— 项目、笔记与一些尝试。",
  "theme.label": "主题",
  "theme.light": "亮色",
  "theme.dark": "深色",
  "theme.system": "跟随系统",
  "lang.label": "English",
  "lang.switch": "切换到英文",
  "nav.posts": "文章",
  "posts.title": "文章",
  "posts.intro": "关于我做了什么、以及为什么,写得长一点的那些。",
  "posts.empty": "还没有发布任何文章。",
  "post.back": "全部文章",
  loading: "加载中…",
  "error.title": "出错了",
  "error.status": "错误",
  "error.notFound": "找不到请求的页面。",
  "error.generic": "发生了意外错误。",
  "error.back": "返回首页",
};

const dictionaries: Record<Locale, Record<MessageKey, string>> = { en, zh };

export type Translate = (key: MessageKey) => string;

export function translator(locale: Locale): Translate {
  const dictionary = dictionaries[locale];
  return (key) => dictionary[key];
}
