import getBooleanAsInteger from "~/utils/getBooleanAsInteger";
import db from ".";

export const createInitialArticle = (title: string, privateArticle: boolean, allowComments: boolean, fromUserID: number) => {
  const results = db
    .prepare("INSERT INTO articles (title, private, allow_comments, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, ?, ?)")
    .run(title, getBooleanAsInteger(privateArticle), getBooleanAsInteger(allowComments), new Date().toISOString(), new Date().toISOString(), fromUserID);

  if (results.changes === 0) {
    throw new Error("L'article n'a pas été crée.");
  }

  return results.lastInsertRowid;
};

export interface Article {
  id: number;
  title: string;
  content: string | null;
  private: number;
  allow_comments: number;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const getArticle = (articleID: number): Article => {
  const results = db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .get(articleID);

  if (!results) {
    throw new Error("L'article n'existe pas.");
  }

  return results as Article;
};

export const updateArticle = (updated_article: Article): void => {
  const results = db
    .prepare("UPDATE articles SET title = ?, content = ?, private = ?, allow_comments = ?, updated_at = ? WHERE id = ?")
    .run(updated_article.title, updated_article.content, updated_article.private, updated_article.allow_comments, new Date().toISOString(), updated_article.id);

  if (results.changes === 0) {
    throw new Error("L'article n'a pas été mis à jour.");
  }
};

export const deleteArticle = (articleID: number): void => {
  const results = db
    .prepare("DELETE FROM articles WHERE id = ?")
    .run(articleID);

  if (results.changes === 0) {
    throw new Error("L'article n'a pas été supprimé.");
  }
}