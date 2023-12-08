import { post } from ".";

export interface Article {
  id: number;
  title: string;
  content: string | null;
  private: boolean;
  allow_comments: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

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

export const getArticle = async (article_id: number): Promise<Article> => {
  const article = await post<{
    article_id: number
  }, Article>("/api/articles/read", { article_id });

  return article;
};

export const patchArticle = async (article_id: number, article_data: Article) => {
  await post<{
    article_id: number,

    title?: string,
    private?: boolean
    allow_comments?: boolean
    content?: string
  }, undefined>("/api/articles/patch", {
    article_id,

    allow_comments: article_data.allow_comments,
    content: article_data.content ?? "",
    private: article_data.private,
    title: article_data.title
  })
};

export const getArticlesPage = async (from?: number): Promise<Article[]> => {
  const data = await post<{
    from?: number
  }, Article[]>("/api/articles/page", {
    from
  });

  return data;
};

export const deleteArticle = async (article_id: number) => {
  await post<{
    article_id: number
  }, undefined>("/api/articles/delete", {
    article_id
  });
};
