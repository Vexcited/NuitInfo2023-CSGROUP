import db from ".";

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
  article_id: number;
}

export const writeComment = (content: string, user_id: number, article_id: number) => {
  const results = db
    .prepare("INSERT INTO comments (content, created_at, user_id, article_id) VALUES (?, ?, ?, ?)")
    .run(content, new Date().toISOString(), user_id, article_id);

  if (results.changes === 0) {
    throw new Error("Le commentaire n'a pas été crée.");
  }

  return results.lastInsertRowid;
};

/**
 * On récupère les commentaires d'un article 20 par 20,
 * à partir d'un ID de commentaire. Si aucun ID n'est
 * spécifié, on récupère les 20 derniers commentaires.
 */
export const getCommentsFromCommentID = (article_id: number, comment_id?: number): Comment[] => {
  let results: Comment[];

  if (typeof comment_id === "number") {
    results = db
      .prepare("SELECT * FROM comments WHERE article_id = ? AND id < ? ORDER BY id DESC LIMIT 20")
      .all(article_id, comment_id) as Comment[];
  }
  else {
    results = db
      .prepare("SELECT * FROM comments WHERE article_id = ? ORDER BY id DESC LIMIT 20")
      .all(article_id) as Comment[];
  }

  return results;  
};

export const deleteComment = (comment_id: number): void => {
  const results = db
    .prepare("DELETE FROM comments WHERE id = ?")
    .run(comment_id);

  if (results.changes === 0) {
    throw new Error("Le commentaire n'a pas été supprimé.");
  }
};

export const getComment = (comment_id: number): Comment => {
  const results = db
    .prepare("SELECT * FROM comments WHERE id = ?")
    .get(comment_id);

  if (!results) {
    throw new Error("Le commentaire n'existe pas.");
  }

  return results as Comment;
}