import { type Component, Show } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { currentUser, currentUserLoading, setCurrentUser } from "../store/user";
import { DropdownMenu } from "@kobalte/core";

import MdiChevronDown from '~icons/mdi/chevron-down'
import MdiTextBoxEdit from '~icons/mdi/text-box-edit'
import MdiLogout from '~icons/mdi/logout'
import { logOut } from "../api/auth";

const Header: Component = () => {
  const navigate = useNavigate();

  return (
    <header class="z-20 flex justify-between items-center px-8 py-5 bg-gray-900 text-gray-200 sticky top-0">
      <h1 class="font-semibold text-xl text-gray-100">
        <A href="/">
          Un blog incroyable
        </A>
      </h1>

      <div class="flex items-center gap-4">
        <Show when={!currentUserLoading()}>
          <Show when={currentUser()}
            fallback={
              <>
                <A href="/login">
                  Se connecter
                </A>
                <A href="/signup">
                  S'inscrire
                </A>
              </>
            }
          >
            {user => (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-800/50 transition-colors rounded-lg select-none">
                  <span>{user().username}</span>
                  <DropdownMenu.Icon class="flex items-center justify-center">
                    <MdiChevronDown />
                  </DropdownMenu.Icon>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content class="mt-2 bg-gray-600 rounded-lg w-full overflow-hidden p-2">
                    <DropdownMenu.Item class="flex gap-2 items-center text-gray-200 px-4 py-2 hover:bg-gray-500 cursor-pointer rounded-md"
                      onSelect={() => navigate("/articles/new")}
                    >
                      <MdiTextBoxEdit /> Écrire un article
                    </DropdownMenu.Item>
                    <DropdownMenu.Item class="flex gap-2 items-center text-gray-200 px-4 py-2 hover:bg-gray-500 cursor-pointer rounded-md"
                      onSelect={async () => {
                        logOut();
                        setCurrentUser(null);
                      }}
                    >
                      <MdiLogout /> Se déconnecter
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            )}
          </Show>
        </Show>
      </div>
    </header>
  )
};

export default Header;
