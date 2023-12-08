import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { createInitialArticle } from "~/database/articles.js";

export const articlesCreateBodySchema = Type.Object({
  title: Type.String(),
  private: Type.Boolean(),
  allow_comments: Type.Boolean()
});

export const articlesCreateHandler = async (req: FastifyRequest<{
  Body: Static<typeof articlesCreateBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const { title, allow_comments, private: is_private } = req.body;

  if (title.length < 3) throw new Error("Le titre est trop court.");
  else if (title.length > 1024) throw new Error("Le titre est trop long.");

  const article_id = createInitialArticle(title, is_private, allow_comments, user.id);
  res.status(200).send({ article_id });
};
