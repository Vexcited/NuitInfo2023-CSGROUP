import { authRegisterHandler, authRegisterBodySchema } from "./register";
import { authLoginHandler, authLoginBodySchema } from "./login";
import { authCheckHandler } from "./check";
import { authLogoutHandler } from "./logout";

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
