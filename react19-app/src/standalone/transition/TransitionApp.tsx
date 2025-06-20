import { getLikes } from "./increment-like-on-server.ts";
import LikesWidget from "./LikesWidget.tsx";

export default function TransitionApp() {
  return (
    <div className={"container mx-auto mt-10 max-w-xl"}>
      <LikesWidget initialLikes={getLikes()} />
    </div>
  );
}
