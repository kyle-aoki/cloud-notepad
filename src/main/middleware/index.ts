import SessionTokenAuthorization from "./session-token-authorization";
import ApiKeyAuthentication from "./api-key-authentication";
import withCatchAsyncError from "../async-catch";
import ValidateRequest from "./validate-request";

@withCatchAsyncError
export default class Middleware {
  static SessionTokenAuthorization = SessionTokenAuthorization;
  static ApiKeyAuthentication = ApiKeyAuthentication;
  static ValidateRequest = ValidateRequest;
}
