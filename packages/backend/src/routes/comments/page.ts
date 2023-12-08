import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { getArticle } from "~/database/articles.js";
import { getCommentsFromCommentID } from "~/database/comments.js";

export const commentsPageBodySchema = Type.Object({
  article_id: Type.Number(),
  /**
   * L'ID du commentaire à partir duquel on veut récupérer les commentaires.
   * Si non spécifié, on récupère les commentaires à partir du premier commentaire.
   */
  from: Type.Optional(Type.Number())
});

export const commentsPageHandler = async (req: FastifyRequest<{
  Body: Static<typeof commentsPageBodySchema>
}>, res: FastifyReply) => {
  const { article_id, from } = req.body;

  const article = getArticle(article_id);

  // On ne récupère pas les commentaires d'un article privé,
  // si l'utilisateur n'est pas l'auteur de l'article.
  if (article.private) {
    const user = await checkAuth(req);
    if (article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");
  }

  // On ne vérifie pas si les commentaires sont autorisés sur cet article.
  // Puisque il peut y avoir des commentaires avant que les commentaires soit désactivés.

  // On récupère les commentaires.
  const comments = getCommentsFromCommentID(article_id, from);
  res.status(200).send(comments);
};
