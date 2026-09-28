import type { Locale } from "./i18n";

/**
 * Publication dates are `YYYY-MM-DD` and rendered in UTC, so the calendar day
 * on the index and on the article never shifts with the reader's timezone.
 */
export function formatDate(date: string, locale: Locale): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) return date;

  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
