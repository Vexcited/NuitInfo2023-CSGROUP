import { articlesCreateHandler, articlesCreateBodySchema } from "./create"
import { articlesPatchHandler, articlesPatchBodySchema } from "./patch";
import { articlesReadHandler, articlesReadBodySchema } from "./read";
import { articlesDeleteHandler, articlesDeleteBodySchema } from "./delete";

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
  }
}

export default articles;
