import type { FastifyRequest } from 'fastify';

import jwt from "jsonwebtoken";
import { type User, getUser } from "~/database/users.js";

export const getTokenCookieName = () => {
  let cookie_name = "token";
  // On ajoute le préfixe "__Host-" au cookie en production.
  if (process.env.NODE_ENV === 'prod') cookie_name = '__Host-' + cookie_name;

  return cookie_name;
}

export const checkAuth = async (req: FastifyRequest): Promise<User> => {
  let cookie_name = getTokenCookieName();

  const signed_cookie = req.cookies[cookie_name];
  if (!signed_cookie) throw new Error("Vous n'êtes pas connecté.");

  // On récupère le token.
  const unsign_result = req.unsignCookie(signed_cookie);
  if (!unsign_result.valid) throw new Error("Vous n'êtes pas connecté.");
  const token = unsign_result.value;
  if (!token) throw new Error("Vous n'êtes pas connecté.");

  // On vérifie le token.
  const user_payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, username: string } | null;
  if (!user_payload) throw new Error("Vous n'êtes pas connecté.");

  const user = await getUser(user_payload.username);
  if (!user) throw new Error("L'utilisateur n'existe pas.");

  return user;
};