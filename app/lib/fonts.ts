import newsreaderLatin from "@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2?url";
import sourceSansItalic from "@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-italic.woff2?url";
import sourceSansLatin from "@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2?url";
import ibmPlexMonoLatin from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";

/**
 * Self-hosted Latin faces. These are the only webfonts on the site.
 *
 * Chinese is deliberately absent. A CJK webfont is several megabytes, and
 * every target OS already ships a face for it — the stacks in `app.css` name
 * those local families and nothing else. `unicode-range` keeps Han characters
 * off this download and off the block period, so Chinese paints immediately
 * while Latin waits.
 *
 * `font-display: block` holds Latin text for a short interval instead of
 * painting a fallback and swapping the face once the file arrives. The same
 * URLs are preloaded from `<head>`, so the wait is usually over before paint.
 */

const LATIN_RANGE =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

type WebFont = {
  family: string;
  style: "normal" | "italic";
  weight: string;
  href: string;
};

const webFonts: WebFont[] = [
  {
    family: "Source Sans 3 Variable",
    style: "normal",
    weight: "200 900",
    href: sourceSansLatin,
  },
  {
    family: "Source Sans 3 Variable",
    style: "italic",
    weight: "200 900",
    href: sourceSansItalic,
  },
  {
    family: "Newsreader Variable",
    style: "normal",
    weight: "200 800",
    href: newsreaderLatin,
  },
  {
    family: "IBM Plex Mono",
    style: "normal",
    weight: "400",
    href: ibmPlexMonoLatin,
  },
];

function fontFaceRule(font: WebFont): string {
  return `@font-face {
  font-family: "${font.family}";
  font-style: ${font.style};
  font-weight: ${font.weight};
  font-display: block;
  src: url("${font.href}") format("woff2");
  unicode-range: ${LATIN_RANGE};
}`;
}

/** Inlined in `<head>` so the faces exist before the stylesheet arrives. */
export const fontFaceCss = webFonts.map(fontFaceRule).join("\n");

/** Every face above. Preload them; none of these files is optional chrome. */
export const fontPreloads = webFonts;
