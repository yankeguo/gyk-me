import { htmlAsInterface } from "~/content/html-as-interface";
import { PostArticle, PostBackLink, postMeta } from "~/pages/post";

export const htmlAsInterfacePostMeta = postMeta(htmlAsInterface);

export function PostPage() {
  return (
    <PostArticle post={htmlAsInterface}>
      <PostBackLink />
    </PostArticle>
  );
}
