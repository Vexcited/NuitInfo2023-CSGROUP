import type { FastifyReply, FastifyRequest } from 'fastify';
import { Type, Static } from '@sinclair/typebox'

import { checkAuth } from "~/utils/checkAuth.js";
import { getComment, deleteComment } from "~/database/comments.js";

export const commentsDeleteBodySchema = Type.Object({
  comment_id: Type.Number()
});

export const commentsDeleteHandler = async (req: FastifyRequest<{
  Body: Static<typeof commentsDeleteBodySchema>
}>, res: FastifyReply) => {
  const user = await checkAuth(req);
  const { comment_id } = req.body;

  // On récupère le commentaire.
  const comment = getComment(comment_id);

  // On vérifie que l'utilisateur est l'auteur du commentaire.
  if (comment.user_id !== user.id) throw new Error("Vous n'êtes pas l'auteur de ce commentaire.");

  deleteComment(comment_id)
  res.status(200).send();
};
