import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth";
import { getArticle } from "~/database/articles";
import { writeComment } from "~/database/comments";

export const commentsWriteBodySchema = Type.Object({
  article_id: Type.Number(),
  content: Type.String()
});

export const commentsWriteHandler = async (req: FastifyRequest<{
  Body: Static<typeof commentsWriteBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const comment_content = req.body.content;

  if (comment_content.length <= 0) throw new Error("Le commentaire ne doit pas être vide.");
  else if (req.body.content.length > 4096) throw new Error("Le commentaire est trop long.");

  const article = getArticle(req.body.article_id);

  // On vérifie que l'utilisateur est l'auteur de l'article si l'article est privé.
  // -> On évite de publier des commentaires sur des articles privés.
  if (article.private && article.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de cet article.");

  // On vérifie que les commentaires sont autorisés sur cet article.
  if (!article.allow_comments) throw new Error("Les commentaires sont désactivés sur cet article.");
  const comment_id = writeComment(comment_content, user.id, article.id);

  res.status(200).send({ comment_id });
};
