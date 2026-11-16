// `/posts/dsh-devlead` — one static route per post, per locale, so the
// article is real HTML in the build rather than something the client router
// assembles.
export {
  PostPage as default,
  dshDevleadPostMeta as meta,
} from "~/pages/post-dsh-devlead";
