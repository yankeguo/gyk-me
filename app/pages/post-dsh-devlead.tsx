import { dshDevlead } from "~/content/dsh-devlead";
import { useLocale } from "~/lib/use-i18n";
import { PostArticle, PostBackLink, PostSources, postMeta } from "~/pages/post";

export const dshDevleadPostMeta = postMeta(dshDevlead);

function Sources() {
  const locale = useLocale();

  return locale === "zh" ? (
    <PostSources>
      本文根据 dsh-devlead 的{" "}
      <a
        href="https://github.com/yankeguo/dsh-devlead/blob/main/docs/releases/v0.2.3.md"
        target="_blank"
        rel="noreferrer"
      >
        v0.2.3 发布说明
      </a>
      、项目 README 与{" "}
      <a
        href="https://github.com/yankeguo/dsh-devlead/blob/main/docs/DESIGN.md"
        target="_blank"
        rel="noreferrer"
      >
        设计说明
      </a>
      写成，于 2026 年 11 月 16 日核对。工具数量与兼容性均以该版本为准。
    </PostSources>
  ) : (
    <PostSources>
      This article is based on the dsh-devlead{" "}
      <a
        href="https://github.com/yankeguo/dsh-devlead/blob/main/docs/releases/v0.2.3.md"
        target="_blank"
        rel="noreferrer"
      >
        v0.2.3 release notes
      </a>
      , project README, and{" "}
      <a
        href="https://github.com/yankeguo/dsh-devlead/blob/main/docs/DESIGN.md"
        target="_blank"
        rel="noreferrer"
      >
        design notes
      </a>
      , checked on 16 November 2026. Tool counts and compatibility refer to that
      version.
    </PostSources>
  );
}

export function PostPage() {
  return (
    <PostArticle post={dshDevlead}>
      <PostBackLink />
      <Sources />
    </PostArticle>
  );
}
