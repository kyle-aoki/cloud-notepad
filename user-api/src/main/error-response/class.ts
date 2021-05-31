import FailedToSetSessionToken from "./response/failed-to-set-session-token";
import IncorrectApiKey from "./response/incorrect-api-key";
import IncorrectHttpMethod from "./response/incorrect-http-method";
import IncorrectUsernameOrPassword from "./response/incorrect-username-or-password";
import InvalidRequestPayload from "./response/invalid-request-payload";
import MissingApiKey from "./response/missing-api-key";
import QueryError from "./response/query-error";
import RouteDoesNotExist from "./response/route-does-not-exist";
import UserAlreadyExists from "./response/user-already-exists";
import NotAuthorized from './response/not-authorized';
import FailedToDeleteUser from "./response/failed-to-delete-user";

class ErrorResponse {
  static RouteDoesNotExist = RouteDoesNotExist;
  static IncorrectApiKey = IncorrectApiKey;
  static IncorrectHttpMethod = IncorrectHttpMethod;
  static InvalidRequestPayload = InvalidRequestPayload;
  static UserAlreadyExists = UserAlreadyExists;
  static MissingApiKey = MissingApiKey;
  static QueryError = QueryError;
  static IncorrectUsernameOrPassword = IncorrectUsernameOrPassword;
  static FailedToSetSessionToken = FailedToSetSessionToken;
  static NotAuthorized = NotAuthorized;
  static FailedToDeleteUser = FailedToDeleteUser;
}

export default ErrorResponse;
