/* @refresh reload */
import "@unocss/reset/tailwind.css";
import 'virtual:uno.css';

import { Router, useRoutes } from '@solidjs/router'
import { render } from 'solid-js/web'
import routes from '~solid-pages'
import { onMount } from "solid-js";
import { setCurrentUser, setCurrentUserLoading } from "./store/user";
import { checkCurrentAuth } from "./api/auth";

render(
  () => {
    const Routes = useRoutes(routes);

    // On vérifie si on est déjà authentifié.
    onMount(async () => {
      setCurrentUserLoading(true);
      const user = await checkCurrentAuth();

      setCurrentUser(user);
      setCurrentUserLoading(false);
    });

    return (
      <Router>
        <Routes />
      </Router>
    )
  },
  document.getElementById('root') as HTMLDivElement
);
