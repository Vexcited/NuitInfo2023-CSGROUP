import { type Component, createSignal, Show } from "solid-js";
import { A, Navigate } from "@solidjs/router";
import { authenticateUser } from "../api/auth.js";
import { APIError } from "../api/index.js";
import { currentUser, setCurrentUser } from "../store/user.js";

import { TextField } from "@kobalte/core";

const LoginPage: Component = () => {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const onFormSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const usr = username();
    const pwd = password();

    setError(null);
    if (!usr || !pwd) return;
    
    try {
      setLoading(true);

      const user = await authenticateUser(usr, pwd);
      setCurrentUser(user);
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
      <Show when={currentUser()}>
        <Navigate href="/" />
      </Show>

      <div class="flex flex-col gap-4 items-center justify-center min-h-screen h-full">
        <h1 class="text-xl text-center font-semibold mb-2 text-gray-700">
          Vous voilà de retour !
        </h1>
        
        <form
          onSubmit={onFormSubmit}
          class="px-6 py-4 bg-gray-100 rounded-lg flex flex-col gap-4 max-w-[320px] w-full shadow"
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

          <TextField.Root class="flex flex-col" value={username()} onChange={setUsername}>
            <TextField.Label class="font-medium mb-1 text-gray-800">
              Nom d'utilisateur
            </TextField.Label>
            <TextField.Input class="px-3 py-1 outline-none focus:outline-blue rounded-lg w-full" />
          </TextField.Root>
          <TextField.Root class="flex flex-col" value={password()} onChange={setPassword}>
            <TextField.Label class="font-medium mb-1 text-gray-800">
              Mot de passe
            </TextField.Label>
            <TextField.Input type="password" class="px-3 py-1 outline-none focus:outline-blue rounded-lg w-full" />
          </TextField.Root>

          <button
            type="submit"
            disabled={loading()}
            class="bg-gray-200 hover:bg-blue hover:text-white text-gray-800 font-medium rounded-lg mt-2 px-4 py-2 transition-colors"
          >
            {loading() ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <A href="/" class="text-sm hover:underline text-gray-600 hover:text-blue">
          Revenir à la page d'accueil
        </A>
        <A href="/signup" class="text-xs hover:underline text-gray-600 hover:text-blue">
          Pas de compte ? S'inscrire !
        </A>
      </div>
    </>
  );
};

export default LoginPage;
