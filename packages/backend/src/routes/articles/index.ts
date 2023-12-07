import { articlesCreateHandler, articlesCreateBodySchema } from "./create"
import { articlesPatchHandler, articlesPatchBodySchema } from "./patch";
import { articlesReadHandler, articlesReadBodySchema } from "./read";

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
}

export default articles;
