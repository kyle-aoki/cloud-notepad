
import IncorrectApiKey from "./response/incorrect-api-key";
import IncorrectHttpMethod from "./response/incorrect-http-method";
import InvalidRequestPayload from "./response/invalid-request-payload";
import MissingApiKey from "./response/missing-api-key";
import QueryError from "./response/query-error";
import RouteDoesNotExist from "./response/route-does-not-exist";
import UserAlreadyExists from "./response/user-already-exists";

class ErrorResponse {
  static InvalidRequestPayload = InvalidRequestPayload;
  static IncorrectHttpMethod = IncorrectHttpMethod;
  static RouteDoesNotExist = RouteDoesNotExist;
  static IncorrectApiKey = IncorrectApiKey;
  static MissingApiKey = MissingApiKey;
  static UserAlreadyExists = UserAlreadyExists;
  static QueryError = QueryError;
}

export default ErrorResponse;
