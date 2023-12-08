import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { createUser } from "~/database/users.js";

export const authRegisterBodySchema = Type.Object({
  username: Type.String(),
  password: Type.String()
});

export const authRegisterHandler = async (req: FastifyRequest<{
  Body: Static<typeof authRegisterBodySchema>
}>, res: FastifyReply) => {
  const { username, password } = req.body;

  // On limite la taille du nom d'utilisateur à 48 caractères.
  if (username.length < 3) throw new Error("Le nom d'utilisateur est trop court.");
  else if (username.length > 48) throw new Error("Le nom d'utilisateur est trop long.");
  
  // On limite la taille du mot de passe à 64 caractères
  // pour éviter les attaques par déni de service.
  if (password.length < 8) throw new Error("Le mot de passe est trop court.");
  else if (password.length > 64) throw new Error("Le mot de passe est trop long.");

  // TODO: On vérifie si le mot de passe est assez fort.

  const user_id = await createUser(username, password);
  res.send({ user_id });
};
