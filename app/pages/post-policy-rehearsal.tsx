import { policyRehearsal } from "~/content/policy-rehearsal";
import { PostArticle, PostBackLink, postMeta } from "~/pages/post";

export const policyRehearsalPostMeta = postMeta(policyRehearsal);

export function PostPage() {
  return (
    <PostArticle post={policyRehearsal}>
      <PostBackLink />
    </PostArticle>
  );
}
