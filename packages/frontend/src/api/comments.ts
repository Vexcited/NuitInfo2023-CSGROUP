import { post } from ".";

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
  article_id: number;
}

export const getCommentsPage = async (article_id: number, from?: number): Promise<Comment[]> => {
  const data = await post<{
    article_id: number,
    from?: number
  }, Comment[]>("/api/comments/page", {
    article_id,
    from
  });

  return data;
};

export const writeComment = async (article_id: number, content: string): Promise<number> => {
  const { comment_id } = await post<{
    article_id: number,
    content: string
  }, {
    comment_id: number
  }>("/api/comments/write", {
    article_id, content
  });

  return comment_id;
};

export const deleteComment = async (comment_id: number) => {
  await post<{
    comment_id: number
  }, undefined>("/api/comments/delete", {
    comment_id
  });
}