// `/posts/dsh-infini-goal` — one static route per post, per locale, so the
// article is real HTML in the build rather than something the client router
// assembles.
export {
  PostPage as default,
  dshInfiniGoalPostMeta as meta,
} from "~/pages/post-dsh-infini-goal";
