// `/posts/html-as-interface` — one static route per post, per locale, so the
// article is real HTML in the build rather than something the client router
// assembles.
export {
  PostPage as default,
  htmlAsInterfacePostMeta as meta,
} from "~/pages/post-html-as-interface";
