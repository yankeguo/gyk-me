import { useLocation } from "react-router";

import {
  localeFromPathname,
  translator,
  type Locale,
  type Translate,
} from "./i18n";

/**
 * The locale is a function of the URL, so the prerendered HTML, the client
 * router, and `meta()` all agree without any shared state.
 */
export function useLocale(): Locale {
  return localeFromPathname(useLocation().pathname);
}

export function useTranslate(): Translate {
  return translator(useLocale());
}
