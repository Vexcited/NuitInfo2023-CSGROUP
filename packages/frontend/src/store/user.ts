import { createSignal } from "solid-js"

export interface CurrentUser {
  username: string
  id: number
}

export const [currentUser, setCurrentUser] = createSignal<CurrentUser | null>(null);
export const [currentUserLoading, setCurrentUserLoading] = createSignal(false);
