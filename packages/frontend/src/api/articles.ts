import { post } from ".";

export const createArticle = async (title: string, is_private = true, allow_comments = false) => {
  const { article_id } = await post<{
    title: string,
    private: boolean,
    allow_comments: boolean
  }, {
    article_id: number
  }>("/api/articles/create", {
    title,
    private: is_private,
    allow_comments
  });

  return article_id;
};
