import { articlesCreateHandler, articlesCreateBodySchema } from "./create.js"
import { articlesPatchHandler, articlesPatchBodySchema } from "./patch.js";
import { articlesReadHandler, articlesReadBodySchema } from "./read.js";
import { articlesDeleteHandler, articlesDeleteBodySchema } from "./delete.js";
import { articlesPageHandler, articlesPageBodySchema } from "./page.js";

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
