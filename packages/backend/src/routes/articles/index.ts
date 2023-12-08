import { articlesCreateHandler, articlesCreateBodySchema } from "./create"
import { articlesPatchHandler, articlesPatchBodySchema } from "./patch";
import { articlesReadHandler, articlesReadBodySchema } from "./read";
import { articlesDeleteHandler, articlesDeleteBodySchema } from "./delete";
import { articlesPageHandler, articlesPageBodySchema } from "./page";

const articles = {
  create: {
    handler: articlesCreateHandler,
    schema: {
      body: articlesCreateBodySchema
    }
  },
  patch: {
    handler: articlesPatchHandler,
    schema: {
      body: articlesPatchBodySchema
    }
  },
  read: {
    handler: articlesReadHandler,
    schema: {
      body: articlesReadBodySchema
    }
  },
  delete: {
    handler: articlesDeleteHandler,
    schema: {
      body: articlesDeleteBodySchema
    }
  },
  page: {
    handler: articlesPageHandler,
    schema: {
      body: articlesPageBodySchema
    }
  }
}

export default articles;
