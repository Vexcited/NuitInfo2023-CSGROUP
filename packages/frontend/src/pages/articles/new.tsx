import { type Component, createSignal, Show } from "solid-js";
import Header from "../../components/header";
import { Checkbox, TextField } from "@kobalte/core";
import { createArticle } from "../../api/articles";
import { useNavigate } from "@solidjs/router";
import { APIError } from "../../api";
import MdiCheck from '~icons/mdi/check'

const Page: Component = () => {
  const [title, setTitle] = createSignal("");
  const [isPrivate, setPrivate] = createSignal(true);
  const [allowComments, setAllowComments] = createSignal(false);

  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const navigate = useNavigate();

  const onFormSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const article_title = title();
    
    setError(null);
    if (!article_title) return;

    try {
      setLoading(true);

      const article_id = await createArticle(article_title, isPrivate(), allowComments());
      navigate(`/articles/editor/${article_id}`);
    }
    catch (error) {
      if (error instanceof APIError) {
        setError(error.message);
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div class="mx-auto max-w-[600px] px-6 w-full mt-8">
        <h2 class="text-center text-xl font-medium">
          Créer un article
        </h2>

        <form
          class="bg-gray-200 px-6 py-4 rounded-xl mt-6 flex flex-col gap-2 items-center"
          onSubmit={onFormSubmit}
        >
          <Show when={error()}>
            {error => (
              <div class="bg-red/10 rounded-lg px-3 py-2">
                <p class="text-red font-medium text-sm text-center">
                  {error()}
                </p>
              </div>
            )}
          </Show>

          <TextField.Root class="flex flex-col w-full" value={title()} onChange={setTitle}>
            <TextField.Label class="font-medium mb-1 text-gray-800">
              Nom de l'article
            </TextField.Label>
            <TextField.Input class="px-3 py-1 outline-none focus:outline-blue rounded-lg" />
          </TextField.Root>

          <div class="flex items-center justify-between gap-6 mt-4 mb-2">
            <Checkbox.Root checked={isPrivate()} onChange={setPrivate} class="flex items-center gap-2">
              <Checkbox.Input />
              <Checkbox.Control class="flex items-center justify-center h-5 w-5 rounded-md border-2 border-gray-500 ui-checked:(border-blue bg-blue text-white)">
                <Checkbox.Indicator>
                  <MdiCheck />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label class="text-gray-800">
                Article privé
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root checked={allowComments()} onChange={setAllowComments} class="flex items-center gap-2">
              <Checkbox.Input />
              <Checkbox.Control class="flex items-center justify-center h-5 w-5 rounded-md border-2 border-gray-500 ui-checked:(border-blue bg-blue text-white)">
                <Checkbox.Indicator>
                  <MdiCheck />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label class="text-gray-800">
                Autoriser les commentaires
              </Checkbox.Label>
            </Checkbox.Root>
          </div>

          <button
            type="submit"
            disabled={loading()}
            class="mx-auto bg-blue hover:bg-blue/60 hover:text-white text-gray-100 font-medium rounded-lg mt-4 px-6 py-2 transition-colors"
          >
            {loading() ? "Création..." : "Créer"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
