import { type Component, createEffect, Show } from "solid-js";
import { Comment } from "../api/comments";
import { currentUser } from "../store/user";
import MdiDelete from '~icons/mdi/delete'

const CustomComment: Component<{
  comment: Comment,
  onDelete: () => void
}> = (props) => {
  let commentContentRef: HTMLParagraphElement | undefined;
  const isFromUser = () => currentUser()?.id === props.comment.user_id;

  createEffect(() => {
    if (!commentContentRef) return;
    // Ici, on utilise `.innerText` à la place
    // de `.innerHTML` pour éviter les potentielles failles XSS.
    commentContentRef.innerText = props.comment.content;
  });

  return (
    <div class="relative">
      <Show when={isFromUser()}>
        <button type="button" class="absolute top-0 right-0 flex p-1.5 text-red rounded-lg hover:(bg-red text-white) transition-colors"
          onClick={() => props.onDelete()}
        >
          <MdiDelete class="text-lg" />
        </button>
      </Show>

      <p class="font-semibold">
        {isFromUser() ? currentUser()!.username : `Utilisateur ${props.comment.user_id}`}
      </p>

      <p class="text-sm text-gray-700">Le {new Date(props.comment.created_at).toLocaleString()}</p>
      <p class="mt-2" ref={commentContentRef} />
    </div>
  )
};

export default CustomComment;
