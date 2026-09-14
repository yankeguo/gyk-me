// `/posts/weft` — one static route per post, per locale, so the article is real
// HTML in the build rather than something the client router assembles.
export { PostPage as default, weftPostMeta as meta } from "~/pages/post-weft";
