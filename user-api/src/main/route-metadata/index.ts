import { Validator } from "../request-schema";
import createUserValidator from "../request-schema/create-user";
import logInValidator from "../request-schema/log-in";

interface Route {
  method: string;
  validatePayload: Validator;
}

interface RequestSchemaUrlMap {
  [x: string]: Route;
}

const routeMetadata: RequestSchemaUrlMap = {
  "/create-user": { method: "POST", validatePayload: createUserValidator },
  "/log-in": { method: "POST", validatePayload: logInValidator },
  "/user/authenticate": { method: "GET", validatePayload: () => true },
  "/user/delete-user": { method: "DELETE", validatePayload: () => true }
};

export default routeMetadata;
