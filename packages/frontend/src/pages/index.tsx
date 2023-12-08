import { type Component, Show } from "solid-js";

import Header from "../components/header";

const Page: Component = () => {
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
    </>
  )
};

export default Page;
