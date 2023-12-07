import { commentsPageBodySchema, commentsPageHandler } from "./page";
import { commentsWriteBodySchema, commentsWriteHandler } from "./write";
import { commentsDeleteBodySchema, commentsDeleteHandler } from "./delete";

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