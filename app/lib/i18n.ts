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
  "nav.home": "Home",
  "nav.about": "About",
  "home.badge": "Static site · prerendered",
  "home.intro":
    "Welcome to gyk.me — a small corner of the internet for my projects, notes, and experiments.",
  "home.cta.about": "About me",
  "home.cta.github": "GitHub",
  "home.stack.prerendered.title": "Prerendered",
  "home.stack.prerendered.description":
    "Every route is rendered to HTML at build time, so there is no runtime server.",
  "home.stack.router.title": "React Router",
  "home.stack.router.description":
    "Framework mode with file-based route modules, typegen, and code splitting.",
  "home.stack.shadcn.title": "shadcn/ui",
  "home.stack.shadcn.description":
    "Base UI primitives on Tailwind CSS v4 design tokens, owned in this repo.",
  "home.stack.bun.title": "Bun",
  "home.stack.bun.description":
    "Installs dependencies, runs scripts, and freezes the lockfile.",
  "about.title": "About",
  "about.p1":
    "I build software — mostly backend services, developer tooling, and the occasional web front end. This site collects what I want to keep around.",
  "about.p2":
    "It is a fully static site: prerendered at build time by React Router, styled with shadcn/ui and Tailwind CSS, and deployed to GitHub Pages.",
  "meta.home.title": "Y.-K. Guo",
  "meta.home.description": "Y.-K. Guo — projects, notes, and experiments.",
  "meta.about.title": "About · Y.-K. Guo",
  "meta.about.description": "About Y.-K. Guo.",
  "theme.label": "Theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.system": "System",
  "lang.label": "中文",
  "lang.switch": "Switch to Chinese",
  loading: "Loading…",
  "error.title": "Oops!",
  "error.status": "Error",
  "error.notFound": "The requested page could not be found.",
  "error.generic": "An unexpected error occurred.",
  "error.back": "Back home",
  "footer.note": "Prerendered with React Router",
} as const;

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  "site.name": "Y.-K. Guo",
  "nav.home": "首页",
  "nav.about": "关于",
  "home.badge": "静态站点 · 构建时预渲染",
  "home.intro": "欢迎来到 gyk.me —— 这里放我的项目、笔记和一些尝试。",
  "home.cta.about": "关于我",
  "home.cta.github": "GitHub",
  "home.stack.prerendered.title": "构建时预渲染",
  "home.stack.prerendered.description":
    "每条路由都在构建时渲染为 HTML，站点不依赖运行时服务。",
  "home.stack.router.title": "React Router",
  "home.stack.router.description":
    "框架模式，具备文件路由模块、类型生成与按路由代码分割。",
  "home.stack.shadcn.title": "shadcn/ui",
  "home.stack.shadcn.description":
    "基于 Base UI 原语与 Tailwind CSS v4 设计令牌，组件由本仓库维护。",
  "home.stack.bun.title": "Bun",
  "home.stack.bun.description": "负责安装依赖、执行脚本，并锁定 lockfile。",
  "about.title": "关于",
  "about.p1":
    "我写软件，主要是后端服务与开发者工具，偶尔也写前端。这个站点用来存放我想留下来的东西。",
  "about.p2":
    "它是个完全静态的站点：由 React Router 在构建时预渲染，用 shadcn/ui 与 Tailwind CSS 设计，托管在 GitHub Pages 上。",
  "meta.home.title": "Y.-K. Guo",
  "meta.home.description": "Y.-K. Guo 的个人站点 —— 项目、笔记与一些尝试。",
  "meta.about.title": "关于 · Y.-K. Guo",
  "meta.about.description": "关于 Y.-K. Guo。",
  "theme.label": "主题",
  "theme.light": "亮色",
  "theme.dark": "深色",
  "theme.system": "跟随系统",
  "lang.label": "English",
  "lang.switch": "切换到英文",
  loading: "加载中…",
  "error.title": "出错了",
  "error.status": "错误",
  "error.notFound": "找不到请求的页面。",
  "error.generic": "发生了意外错误。",
  "error.back": "返回首页",
  "footer.note": "由 React Router 预渲染",
};

const dictionaries: Record<Locale, Record<MessageKey, string>> = { en, zh };

export type Translate = (key: MessageKey) => string;

export function translator(locale: Locale): Translate {
  const dictionary = dictionaries[locale];
  return (key) => dictionary[key];
}
