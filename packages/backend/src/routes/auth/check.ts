import type { FastifyReply, FastifyRequest } from 'fastify';

import { checkAuth } from "~/utils/checkAuth.js";

export const authCheckHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const user = await checkAuth(req);
  res.status(200).send({
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
    id: user.id
  });
};
