import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUser } from "~/database/users.js";

export const authLoginBodySchema = Type.Object({
  username: Type.String(),
  password: Type.String()
});

export const authLoginHandler = async (req: FastifyRequest<{
  Body: Static<typeof authLoginBodySchema>
}>, res: FastifyReply) => {
  const { username, password } = req.body;

  // On vérifie que la taille du nom d'utilisateur est limité à 48 caractères.
  if (username.length > 48) throw new Error("Le nom d'utilisateur est trop long.");
  
  // On vérifie que la taille du mot de passe est limité à 64 caractères.
  if (password.length > 64) throw new Error("Le mot de passe est trop long.");

  const user = await getUser(username);
  if (!user) throw new Error("L'utilisateur n'existe pas.");

  const is_password_valid = await bcrypt.compare(password, user.password);
  if (!is_password_valid) throw new Error("Le mot de passe est incorrect.");

  const user_payload = {
    id: user.id,
    username: user.username
  };

  const token = jwt.sign(user_payload, process.env.JWT_SECRET as string, {
    // On expire le token au bout de 12 heures.
    expiresIn: '12h'
  });

  let cookie_name = "token";
  // On ajoute le préfixe "__Host-" au cookie en production.
  if (process.env.NODE_ENV === 'prod') cookie_name = '__Host-' + cookie_name;

  res.setCookie(cookie_name, token, {
    path: '/',
    sameSite: true,

    // On envoie le cookie uniquement en HTTPS en production.
    secure: process.env.NODE_ENV === 'prod',
    // Ne pas autoriser accès au cookie avec `document.cookie`.
    httpOnly: true,
    
    // On expire le cookie au bout de 12 heures.
    // En même temps que le token.
    expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
    
    // On utilise un cookie signé.
    signed: true
  });

  res.status(200).send({
    username: user.username,
    id: user.id
  });
};
