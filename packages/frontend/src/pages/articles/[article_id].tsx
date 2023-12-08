import { type Component, createEffect, createSignal, Show, on, For } from "solid-js";
import Header from "../../components/header";

import { Article, getArticle } from "../../api/articles";
import { useParams } from "@solidjs/router";
import { APIError } from "../../api";
import { TextField } from "@kobalte/core";
import CustomComment from "../../components/custom_comment";
import { Comment, deleteComment, getCommentsPage, writeComment } from "../../api/comments";
import { currentUser } from "../../store/user";

const Page: Component = () => {
  const params = useParams();

  const [article, setArticle] = createSignal<Article | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [commentContent, setCommentContent] = createSignal("");
  const [comments, setComments] = createSignal<Comment[]>([]);
  const [noMoreComments, setNoMoreComments] = createSignal(false);

  createEffect(on(() => params.article_id, async (str_article_id) => {
    const article_id = parseInt(str_article_id);
    
    try {
      setError(null);

      const article = await getArticle(article_id);
      setArticle(article);

      const comments = await getCommentsPage(article_id);
      if (comments.length < 20) setNoMoreComments(true);
      setComments(comments);
    }
    catch (error) {
      if (error instanceof APIError) {
        setError(error.message);
      }
    }
  }));

  const getMoreComments = async () => {
    const article_id = parseInt(params.article_id);

    const current_comments = comments();
    const oldest_comment = current_comments[current_comments.length - 1];

    const old_comments = await getCommentsPage(article_id, oldest_comment.id);
    if (old_comments.length === 0) {
      setNoMoreComments(true);
    }
    else {
      // On fait des pages de 20 commentaires,
      // donc s'il y en a moins, alors on a plus de commentaire.
      if (old_comments.length < 20) setNoMoreComments(true);

      setComments((prev) => [
        ...prev,
        ...old_comments
      ]);
    }
  }

  const onCommentSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    // S'il n'y a pas d'utilisateur connecté,
    // on envoie pas de requête.
    const user = currentUser();
    if (!user) return;

    const comment_id = await writeComment(parseInt(params.article_id), commentContent());
    setComments(prev => [
      {
        id: comment_id,
        content: commentContent(),
        created_at: new Date().toISOString(),
        article_id: parseInt(params.article_id),
        user_id: user.id
      },
      ...prev
    ]);

    setCommentContent("");
  };

  return (
    <>
      <Header />

      <Show when={article()}
        fallback={
          <Show when={error()}
            fallback={
              <div class="bg-gray-800/10 rounded-lg px-3 py-2">
                <p class="text-gray-800 font-medium text-sm text-center">
                  Chargement des données de l'article
                </p>
              </div>
            }
          >
            <div class="bg-red/10 rounded-lg px-3 py-2">
              <p class="text-red font-medium text-sm text-center">
                {error()}
              </p>
            </div>
          </Show>
        }
      >
        {article => (
          <div class="mx-auto max-w-[600px] px-6 w-full mt-8 pb-6 flex flex-col">
            <h2 class="text-2xl font-semibold">
              {article().title}
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              Ajouté le {new Date(article().created_at).toLocaleString()}.<br />
              Mis à jour pour la dernière fois le {new Date(article().updated_at).toLocaleString()}
            </p>
            
            <p class="mt-6 text-justify">
              {article().content ?? ""}
            </p>

            <hr class="mt-6" />

            <Show when={article().allow_comments}
              fallback={
                <p>
                  Cet article n'autorise pas les commentaires
                </p>
              }
            >
              <Show when={currentUser()}
                fallback={
                  <div>
                    <p>Connectez-vous pour écrire un commentaire</p>
                  </div>
                }
              >
                <form onSubmit={onCommentSubmit}>
                  <TextField.Root class="flex flex-col w-full mt-6" value={commentContent()} onChange={setCommentContent}>
                    <TextField.Label class="font-medium mb-1 text-gray-800">
                      Écrire un commentaire
                    </TextField.Label>
                    <TextField.TextArea autoResize class="px-3 py-1 outline-none focus:outline-blue rounded-lg bg-gray-200 hover:bg-gray-100 focus:bg-gray-100" />
                  </TextField.Root>
                  
                  <button
                    type="submit"
                    class="bg-blue hover:bg-blue/60 hover:text-white text-gray-100 font-medium rounded-lg mt-4 px-6 py-2 transition-colors"
                  >
                    Commenter
                  </button>
                </form>
              </Show>

              <hr class="my-6" />

              <div class="flex flex-col gap-4 pb-4">
                <For each={comments()}>
                  {comment => (
                    <CustomComment
                      comment={comment}
                      onDelete={async () => {
                        await deleteComment(comment.id);

                        setComments(prev => prev.filter(
                          actual => actual.id !== comment.id
                        ));
                      }}  
                    />
                  )}
                </For>
                
                <Show when={!noMoreComments()}>
                  <button type="button"
                    onClick={getMoreComments}
                    class="rounded-full px-6 py-1.5 bg-blue-500 hover:bg-blue text-white w-fit mx-auto transition-colors"
                  >
                    Lire plus de commentaires
                  </button>
                </Show>
              </div>
            </Show>
          </div>
        )}
      </Show>
    </>
  );
};

export default Page;
