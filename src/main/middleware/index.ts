import withCatchAsyncError from "../async-catch";
import ApiKeyAuthentication from "./api-key-authentication";
import SessionTokenAuthorization from "./session-token-authorization";
import ValidateRequest from "./validate-request";

@withCatchAsyncError
export default class Middleware {
  static ApiKeyAuthentication = ApiKeyAuthentication;
  static SessionTokenAuthorization = SessionTokenAuthorization;
  static ValidateRequest = ValidateRequest;
}
