import type { FastifyReply, FastifyRequest } from 'fastify';

export const authLogoutHandler = async (req: FastifyRequest, res: FastifyReply) => {
  let cookie_name = "token";
  // On ajoute le préfixe "__Host-" au cookie en production.
  if (process.env.NODE_ENV === 'prod') cookie_name = '__Host-' + cookie_name;

  // On efface le cookie de connexion.
  res.clearCookie(cookie_name, { path: '/' });
  res.status(200).send();
};
