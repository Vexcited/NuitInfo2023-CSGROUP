import { createSignal, type Component, onMount, For } from "solid-js";

import Header from "../components/header";
import { Article, deleteArticle, getArticlesPage } from "../api/articles";
import { A } from "@solidjs/router";
import MdiTextBoxEdit from '~icons/mdi/text-box-edit'
import MdiDelete from '~icons/mdi/delete'

const Page: Component = () => {
  const [articles, setArticles] = createSignal<Article[]>([]);
  
  onMount(async () => {
    const articles = await getArticlesPage();
    setArticles(articles);
  })

  return (
    <>
      <Header />

      <section class="bg-gray-200 py-8 flex flex-col items-center justify-center gap-3">
        <h2 class="text-3xl font-bold text-gray-800">
          Vous êtes sur un blog incroyable.
        </h2>
        <p class="text-lg text-gray-600">
          Explorez les meilleurs articles rédigés par les utilisateurs sur la nuit de l'info !
        </p>
      </section>

      <main class="max-w-[600px] w-full mx-auto flex flex-col gap-6 mt-6">
        <For each={articles()}>
          {article => (
            <div class="relative px-5 py-3 hover:bg-gray-100 rounded-lg transition-colors">
              <div class="absolute top-2 right-2 flex gap-2">
                <button type="button" class=" p-1.5 text-red rounded-lg hover:(bg-red text-white) transition-colors"
                  onClick={async () => {
                    await deleteArticle(article.id);
                    setArticles(prev => prev.filter(
                      curr => curr.id !== article.id
                    ));
                  }}
                >
                  <MdiDelete />
                </button>
                <A href={`/articles/editor/${article.id}`} class="p-1.5 text-blue rounded-lg hover:(bg-blue text-white) transition-colors">
                  <MdiTextBoxEdit />
                </A>

              </div>

              <A href={`/articles/${article.id}`}>
                <p class="text-2xl font-medium">
                  {article.title}
                </p>
                <p class="text-gray-500">
                  Mis à jour le {new Date(article.updated_at).toLocaleString()}
                </p>
              </A>
            </div>
          )}
        </For>
      </main>
    </>
  )
};

export default Page;
