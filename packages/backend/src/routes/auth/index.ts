import { authRegisterHandler, authRegisterBodySchema } from "./register.js";
import { authLoginHandler, authLoginBodySchema } from "./login.js";
import { authCheckHandler } from "./check.js";
import { authLogoutHandler } from "./logout.js";

const auth = {
  register: {
    handler: authRegisterHandler,
    schema: {
      body: authRegisterBodySchema
    }
  },

  login: {
    handler: authLoginHandler,
    schema: {
      body: authLoginBodySchema
    }
  },

  check: {
    handler: authCheckHandler
  },

  logout: {
    handler: authLogoutHandler
  }
}

export default auth;
