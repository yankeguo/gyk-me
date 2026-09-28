import { randomRoom } from "~/content/random-room";
import { PostArticle, PostBackLink, postMeta } from "~/pages/post";

export const randomRoomPostMeta = postMeta(randomRoom);

export function PostPage() {
  return (
    <PostArticle post={randomRoom}>
      <PostBackLink />
    </PostArticle>
  );
}
