import { commentsPageBodySchema, commentsPageHandler } from "./page.js";
import { commentsWriteBodySchema, commentsWriteHandler } from "./write.js";
import { commentsDeleteBodySchema, commentsDeleteHandler } from "./delete.js";

const comments = {
  page: {
    handler: commentsPageHandler,
    schema: {
      body: commentsPageBodySchema
    }
  },

  write: {
    handler: commentsWriteHandler,
    schema: {
      body: commentsWriteBodySchema
    }
  },

  delete: {
    handler: commentsDeleteHandler,
    schema: {
      body: commentsDeleteBodySchema
    }
  }
};

export default comments;