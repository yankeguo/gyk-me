import { weft } from "~/content/weft";
import { PostArticle, PostBackLink, postMeta } from "~/pages/post";

export const weftPostMeta = postMeta(weft);

export function PostPage() {
  return (
    <PostArticle post={weft}>
      <PostBackLink />
    </PostArticle>
  );
}
