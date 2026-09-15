import type { MetaArgs } from "react-router";

import { sensorActuator } from "~/content/sensor-actuator";
import { localeFromPathname, siteName } from "~/lib/i18n";
import { useLocale } from "~/lib/use-i18n";
import { PostArticle, PostBackLink, PostSources } from "~/pages/post";

export function sensorActuatorPostMeta({ location }: MetaArgs) {
  const locale = localeFromPathname(location.pathname);

  return [
    { title: `${sensorActuator.locales[locale].title} — ${siteName}` },
    { name: "description", content: sensorActuator.locales[locale].summary },
  ];
}

function Sources() {
  const locale = useLocale();

  return locale === "zh" ? (
    <PostSources>
      V4.1-Flash 的规格与价格，以及 V4-Pro 保留服务一事，来自 DeepSeek
      官方文档的{" "}
      <a
        href="https://api-docs.deepseek.com/zh-cn/updates/"
        target="_blank"
        rel="noreferrer"
      >
        更新日志
      </a>{" "}
      与{" "}
      <a
        href="https://api-docs.deepseek.com/zh-cn/quick_start/pricing/"
        target="_blank"
        rel="noreferrer"
      >
        定价页
      </a>
      ，两者均于 2026 年 9 月 15 日核对。发布说明里关于 V4-Pro
      下线的表述，已被上述两页撤回。
    </PostSources>
  ) : (
    <PostSources>
      The V4.1-Flash specifications and prices, and V4-Pro's reprieve, come from
      DeepSeek's official{" "}
      <a
        href="https://api-docs.deepseek.com/updates"
        target="_blank"
        rel="noreferrer"
      >
        changelog
      </a>{" "}
      and{" "}
      <a
        href="https://api-docs.deepseek.com/quick_start/pricing"
        target="_blank"
        rel="noreferrer"
      >
        pricing page
      </a>
      , both checked on 15 September 2026. The retirement of V4-Pro described in
      the original release note has since been withdrawn on those two pages.
    </PostSources>
  );
}

export function PostPage() {
  return (
    <PostArticle post={sensorActuator}>
      <PostBackLink />
      <Sources />
    </PostArticle>
  );
}
