import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { getArticle, updateArticle } from "~/database/articles.js";
import getBooleanAsInteger from "~/utils/getBooleanAsInteger.js";

export const articlesPatchBodySchema = Type.Object({
  article_id: Type.Number(),

  // Propriétés que l'on peut mettre à jour.
  title: Type.Optional(Type.String()),
  private: Type.Optional(Type.Boolean()),
  allow_comments: Type.Optional(Type.Boolean()),
  content: Type.Optional(Type.String())
});

export const articlesPatchHandler = async (req: FastifyRequest<{
  Body: Static<typeof articlesPatchBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const article = getArticle(req.body.article_id);

  // On vérifie que l'utilisateur est l'auteur de l'article.
  if (article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");
  
  /**
   * Si on veut mettre à jour le titre,
   * on vérifie que le nouveau titre est différent de l'ancien.
   * Aussi, on vérifie que le nouveau titre est valide.
   */
  if ("title" in req.body) {
    if (!req.body.title) throw new Error("Le titre est invalide.");
    article.title = req.body.title;

    if (article.title.length < 3) throw new Error("Le titre est trop court.");
    else if (article.title.length > 1024) throw new Error("Le titre est trop long.");
  }

  /**
   * Si on veut mettre à jour le titre,
   * on vérifie que le nouveau titre est différent de l'ancien.
   * Aussi, on vérifie que le nouveau titre est valide.
   */
  if ("content" in req.body) {
    if (!req.body.content) throw new Error("Le contenu est invalide.");
    article.content = req.body.content;
  }

  /**
   * Si on veut mettre à jour la propriété `private`,
   * on vérifie que la nouvelle valeur est différente de l'ancienne.
   */
  if ("private" in req.body) {
    if (typeof req.body.private !== "boolean") throw new Error("La propriété `private` est invalide.");
    article.private = getBooleanAsInteger(req.body.private);
  }

  /**
   * Si on veut mettre à jour la propriété `allow_comments`,
   * on vérifie que la nouvelle valeur est différente de l'ancienne.
   */
  if ("allow_comments" in req.body) {
    if (typeof req.body.allow_comments !== "boolean") throw new Error("La propriété `allow_comments` est invalide.");
    article.allow_comments = getBooleanAsInteger(req.body.allow_comments);
  }

  updateArticle(article);
  res.status(200).send();
};
