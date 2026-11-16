import { dshInfiniGoal } from "~/content/dsh-infini-goal";
import { useLocale } from "~/lib/use-i18n";
import { PostArticle, PostBackLink, PostSources, postMeta } from "~/pages/post";

export const dshInfiniGoalPostMeta = postMeta(dshInfiniGoal);

function Sources() {
  const locale = useLocale();

  return locale === "zh" ? (
    <PostSources>
      本文根据 dsh-infini-goal 的{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/releases/v0.2.1.md"
        target="_blank"
        rel="noreferrer"
      >
        v0.2.1 发布说明
      </a>
      、项目 README、{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/DESIGN.md"
        target="_blank"
        rel="noreferrer"
      >
        设计说明
      </a>{" "}
      与{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/DISABLE-BUILTIN-GOAL.md"
        target="_blank"
        rel="noreferrer"
      >
        官方 goal 关闭层说明
      </a>
      写成，于 2026 年 11 月 16 日核对。版本与兼容性均以 v0.2.1 为准。
    </PostSources>
  ) : (
    <PostSources>
      This article is based on the dsh-infini-goal{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/releases/v0.2.1.md"
        target="_blank"
        rel="noreferrer"
      >
        v0.2.1 release notes
      </a>
      , project README,{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/DESIGN.md"
        target="_blank"
        rel="noreferrer"
      >
        design notes
      </a>
      , and{" "}
      <a
        href="https://github.com/yankeguo/dsh-infini-goal/blob/main/docs/DISABLE-BUILTIN-GOAL.md"
        target="_blank"
        rel="noreferrer"
      >
        built-in goal disable-layer notes
      </a>
      , checked on 16 November 2026. Version and compatibility statements refer
      to v0.2.1.
    </PostSources>
  );
}

export function PostPage() {
  return (
    <PostArticle post={dshInfiniGoal}>
      <PostBackLink />
      <Sources />
    </PostArticle>
  );
}
