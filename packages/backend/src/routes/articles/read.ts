import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { getArticle } from "~/database/articles.js";

export const articlesReadBodySchema = Type.Object({
  article_id: Type.Number(),
});

export const articlesReadHandler = async (req: FastifyRequest<{
  Body: Static<typeof articlesReadBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const article = getArticle(req.body.article_id);

  // On vérifie que l'utilisateur est l'auteur de l'article
  // si l'article est privé.
  if (article.private && article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");
  if (article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");
  
  res.status(200).send({
    ...article,
    // On convertit les valeurs `0` et `1` en booléens.
    allow_comments: Boolean(article.allow_comments),
    private: Boolean(article.private)
  });
};
