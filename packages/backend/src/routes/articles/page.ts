import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth, getTokenCookieName } from "~/utils/checkAuth.js";
import { Article, getArticlesFromID } from "~/database/articles.js";

export const articlesPageBodySchema = Type.Object({
  /**
   * L'ID de l'article à partir duquel on veut récupérer les anciens articles.
   * Si non spécifié, on récupère les articles à partir du plus récent.
   */
  from: Type.Optional(Type.Number())
});

export const articlesPageHandler = async (req: FastifyRequest<{
  Body: Static<typeof articlesPageBodySchema>
}>, res: FastifyReply) => {
  const { from } = req.body;

  let filter_fn = (article: Article) => !article.private;

  let cookie_name = getTokenCookieName();
  // If authenticated, let's check !
  if (req.cookies[cookie_name]) {
    const user = await checkAuth(req);
    filter_fn = (article: Article) => !article.private || article.user_id === user.id;
  }

  let articles = getArticlesFromID(from).filter(filter_fn)
  res.status(200).send(articles);
};
