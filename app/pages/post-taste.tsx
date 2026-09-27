import type { MetaArgs } from "react-router";

import { taste } from "~/content/taste";
import { localeFromPathname, siteName } from "~/lib/i18n";
import { useLocale } from "~/lib/use-i18n";
import { PostArticle, PostBackLink, PostSources } from "~/pages/post";

export function tastePostMeta({ location }: MetaArgs) {
  const locale = localeFromPathname(location.pathname);

  return [
    { title: `${taste.locales[locale].title} — ${siteName}` },
    { name: "description", content: taste.locales[locale].summary },
  ];
}

function Sources() {
  const locale = useLocale();

  return locale === "zh" ? (
    <PostSources>
      约 2170 万美元的承诺与捐赠（含多年期出资和模型额度），以及赞助方名单，来自
      Omacom Foundation 2026 年 8 月 21 日的
      <a
        href="https://omarchy.org/news/2026/08/omacom-foundation-launches-with-8-million/"
        target="_blank"
        rel="noreferrer"
      >
        公告
      </a>
      ，页面更新记到 9 月 22 日，于 2026 年 9 月 27 日核对。omakase 的说法见其
      <a
        href="https://learn.omacom.io/3/omacom/76/omakase-computing"
        target="_blank"
        rel="noreferrer"
      >
        Omakase Computing
      </a>
      。Hyprland、Quickshell 与 mise 的赞助关系，引自 9 月 3 日的
      <a
        href="https://omarchy.org/news/2026/09/omacom-patronage-is-open-to-everyone/"
        target="_blank"
        rel="noreferrer"
      >
        公开赞助说明
      </a>
      。发行版「更接近 Arch 加个人配置」的批评，见
      <a
        href="https://www.theregister.com/software/2026/09/17/omarchy-gains-185m-in-backing-fresh-converts-and-fierce-critics/5296780"
        target="_blank"
        rel="noreferrer"
      >
        The Register
      </a>
      9 月 17 日的报道。
    </PostSources>
  ) : (
    <PostSources>
      The figure of about $21.7 million in pledges and donations — including
      multi-year commitments and model credits — and the patron list come from
      the Omacom Foundation's{" "}
      <a
        href="https://omarchy.org/news/2026/08/omacom-foundation-launches-with-8-million/"
        target="_blank"
        rel="noreferrer"
      >
        21 August 2026 announcement
      </a>
      , whose updates run through 22 September, checked on 27 September 2026.
      The omakase account is the foundation's own{" "}
      <a
        href="https://learn.omacom.io/3/omacom/76/omakase-computing"
        target="_blank"
        rel="noreferrer"
      >
        Omakase Computing
      </a>{" "}
      note. The Hyprland, Quickshell, and mise sponsorships are as stated in the{" "}
      <a
        href="https://omarchy.org/news/2026/09/omacom-patronage-is-open-to-everyone/"
        target="_blank"
        rel="noreferrer"
      >
        3 September patronage note
      </a>
      . The criticism that the distribution is closer to Arch plus a personal
      config is reported by{" "}
      <a
        href="https://www.theregister.com/software/2026/09/17/omarchy-gains-185m-in-backing-fresh-converts-and-fierce-critics/5296780"
        target="_blank"
        rel="noreferrer"
      >
        The Register
      </a>{" "}
      on 17 September 2026.
    </PostSources>
  );
}

export function PostPage() {
  return (
    <PostArticle post={taste}>
      <PostBackLink />
      <Sources />
    </PostArticle>
  );
}
