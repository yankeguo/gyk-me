import { useEffect, useSyncExternalStore } from "react";

import {
  applyTheme,
  getServerTheme,
  getTheme,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "./theme";

export function useTheme(): { theme: Theme; setTheme: (theme: Theme) => void } {
  // React renders the server snapshot while hydrating and swaps to the stored
  // value afterwards, so the prerendered markup stays authoritative.
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getTheme,
    getServerTheme,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => applyTheme(getTheme());
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return { theme, setTheme };
}
