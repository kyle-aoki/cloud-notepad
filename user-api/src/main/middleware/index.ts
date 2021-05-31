import withCatchAsyncError from "../async-catch";
import ApiKeyAuthentication from "./api-key-authentication";
import SessionTokenAuthorization from "./session-token-authorization";
import ValidateRequestSchema from "./validate-request-schema";

@withCatchAsyncError
class Middleware {
  static ApiKeyAuthentication = ApiKeyAuthentication;
  static SessionTokenAuthorization = SessionTokenAuthorization;
  static ValidateRequestSchema = ValidateRequestSchema;
}

export default Middleware;
