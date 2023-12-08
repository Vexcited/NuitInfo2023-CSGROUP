import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { deleteArticle, getArticle } from "~/database/articles.js";

export const articlesDeleteBodySchema = Type.Object({
  article_id: Type.Number()
});

export const articlesDeleteHandler = async (req: FastifyRequest<{
  Body: Static<typeof articlesDeleteBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const { article_id } = req.body;
  const article = getArticle(article_id);

  // On vérifie que l'utilisateur est l'auteur de l'article.
  if (article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");
  
  deleteArticle(article_id)
  res.status(200).send();
};
