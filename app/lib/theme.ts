/**
 * Theme store, kept free of React imports so the pre-paint script can be
 * imported anywhere. React bindings live in `use-theme.ts`.
 */

export const themes = ["light", "dark", "system"] as const;

export type Theme = (typeof themes)[number];

const storageKey = "gyk-me:theme";

export function isTheme(value: unknown): value is Theme {
  return themes.includes(value as Theme);
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

let current: Theme | undefined;

const listeners = new Set<() => void>();

export function getTheme(): Theme {
  current ??= readStoredTheme();
  return current;
}

/** Used while prerendering: the document is written before a choice exists. */
export function getServerTheme(): Theme {
  return "system";
}

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme: Theme): void {
  const dark = theme === "dark" || (theme === "system" && prefersDark());
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  current = theme;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Storage can be unavailable (private mode); the class still applies.
  }
  applyTheme(theme);
  for (const listener of listeners) listener();
}

/**
 * Runs before the first paint so a stored choice never flashes the wrong
 * theme. Inlined in `<head>` by the root layout.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(storageKey)};var v=localStorage.getItem(k);var t=v==="light"||v==="dark"||v==="system"?v:"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;
