import { PayloadValidator } from "./body";
import createUserPayloadValidator from "./body/create-user";
import deleteUserPayloadValidator from "./body/delete-user";
import doesUserExistValidator from "./body/does-user-exist";
import logInPayloadValidator from "./body/log-in";
import { HeaderValidator } from "./headers";
import authorizationHeaderValidator from "./headers/authorization-headers";

interface Route {
  method: string;
  validatePayload: PayloadValidator;
  validateHeaders: HeaderValidator;
}

interface RequestSchema {
  [routeUrl: string]: Route;
}

const requestSchema: RequestSchema = {
  "/create-user": {
    method: "POST",
    validatePayload: createUserPayloadValidator,
    validateHeaders: () => true,
  },
  "/log-in": {
    method: "POST",
    validatePayload: logInPayloadValidator,
    validateHeaders: () => true,
  },
  "/does-user-exist": {
    method: "POST",
    validatePayload: doesUserExistValidator,
    validateHeaders: () => true,
  },
  "/user/authenticate": {
    method: "POST",
    validatePayload: () => true,
    validateHeaders: authorizationHeaderValidator,
  },
  "/user/delete-user": {
    method: "DELETE",
    validatePayload: deleteUserPayloadValidator,
    validateHeaders: authorizationHeaderValidator,
  },
};

export default requestSchema;
