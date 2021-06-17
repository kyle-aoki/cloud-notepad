import SessionTokenAuthorization from "./session-token-authorization";
import ApiKeyAuthentication from "./api-key-authentication";
import withCatchAsyncError from "../async-catch";

@withCatchAsyncError
export default class Middleware {
  static SessionTokenAuthorization = SessionTokenAuthorization;
  static ApiKeyAuthentication = ApiKeyAuthentication;
}
