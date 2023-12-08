import { type Component, createEffect, createSignal, Show, on } from "solid-js";
import Header from "../../../components/header";

import { Article, getArticle, patchArticle } from "../../../api/articles";
import { A, useParams } from "@solidjs/router";
import { APIError } from "../../../api";
import { Checkbox, TextField } from "@kobalte/core";
import MdiCheck from '~icons/mdi/check'

const Page: Component = () => {
  const params = useParams();

  const [article, setArticle] = createSignal<Article | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(on(() => params.article_id, async (str_article_id) => {
    const article_id = parseInt(str_article_id);
    
    try {
      setError(null);
      setLoading(true);

      const article = await getArticle(article_id);
      setArticle(article);
    }
    catch (error) {
      if (error instanceof APIError) {
        setError(error.message);
      }
    }
    finally {
      setLoading(false);
    }
  }));

  const updateProperty = <K extends keyof Article>(key: K, value: Article[K]) => {
    setArticle(prev => ({
      ...(prev as Article),
      [key]: value
    }));
  };

  const handleSubmitClick = async () => {
    try {
      setError(null);
      setLoading(true);

      await patchArticle(parseInt(params.article_id), article()!);
    }
    catch (error) {
      if (error instanceof APIError) {
        setError(error.message);
      }
    }
    finally {
      setLoading(false);
    } 
  }

  return (
    <>
      <Header />

      <Show when={article()}
        fallback={
          <Show when={error()}
            fallback={
              <div class="bg-gray-200/10 rounded-lg px-3 py-2">
                <p class="text-gray-200 font-medium text-sm text-center">
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
            <TextField.Root class="flex flex-col w-full" value={article().title} onChange={(val) => updateProperty("title", val)}>
              <TextField.Label class="font-medium mb-1 text-gray-800">
                Nom de l'article
              </TextField.Label>
              <TextField.Input class="px-3 py-1 outline-none focus:outline-blue rounded-lg bg-gray-200 hover:bg-gray-100 focus:bg-gray-100" />
            </TextField.Root>
            
            <div class="flex items-center justify-between gap-6 mt-4 mb-2">
              <Checkbox.Root checked={article().private} onChange={(checked) => updateProperty("private", checked)} class="flex items-center gap-2">
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

              <Checkbox.Root checked={article().allow_comments} onChange={(checked) => updateProperty("allow_comments", checked)} class="flex items-center gap-2">
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

            <TextField.Root class="flex flex-col w-full mt-6" value={article().content ?? ""} onChange={(val) => updateProperty("content", val)}>
              <TextField.Label class="font-medium mb-1 text-gray-800">
                Contenu de l'article
              </TextField.Label>
              <TextField.TextArea autoResize class="px-3 py-1 outline-none focus:outline-blue rounded-lg bg-gray-200 hover:bg-gray-100 focus:bg-gray-100" />
            </TextField.Root>
            
            <button
              type="button"
              disabled={loading()}
              onClick={handleSubmitClick}
              class="bg-blue hover:bg-blue/60 hover:text-white text-gray-100 font-medium rounded-lg mt-4 px-6 py-2 transition-colors w-full"
            >
              {loading() ? "Publication..." : "Publier"}
            </button>
            
            <A href={`/articles/${params.article_id}`}
              class="text-sm mt-4 text-center hover:underline text-gray-600 hover:text-blue"
            >
              Voir l'article sur le blog
            </A>
          </div>
        )}
      </Show>
    </>
  );
};

export default Page;
