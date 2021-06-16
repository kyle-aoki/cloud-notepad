import IncorrectUsernameOrPassword from "./response/incorrect-username-or-password";
import FailedToSetSessionToken from "./response/failed-to-set-session-token";
import InvalidRequestPayload from "./response/invalid-request-payload";
import IncorrectHttpMethod from "./response/incorrect-http-method";
import FailedToDeleteUser from "./response/failed-to-delete-user";
import FailedToCreateUser from "./response/failed-to-create-user";
import RouteDoesNotExist from "./response/route-does-not-exist";
import UserAlreadyExists from "./response/user-already-exists";
import IncorrectApiKey from "./response/incorrect-api-key";
import InvalidPassword from "./response/invalid-password";
import InvalidUsername from "./response/invalid-username";
import MissingApiKey from "./response/missing-api-key";
import NotAuthorized from "./response/not-authorized";
import InvalidHeader from "./response/invalid-header";
import MissingHeader from "./response/missing-header";
import GenericError from "./response/generic-error";
import QueryError from "./response/query-error";

export default class ErrorResponse {
  static IncorrectUsernameOrPassword = IncorrectUsernameOrPassword;
  static FailedToSetSessionToken = FailedToSetSessionToken;
  static InvalidRequestPayload = InvalidRequestPayload;
  static IncorrectHttpMethod = IncorrectHttpMethod;
  static FailedToDeleteUser = FailedToDeleteUser;
  static FailedToCreateUser = FailedToCreateUser;
  static RouteDoesNotExist = RouteDoesNotExist;
  static UserAlreadyExists = UserAlreadyExists;
  static IncorrectApiKey = IncorrectApiKey;
  static InvalidPassword = InvalidPassword;
  static InvalidUsername = InvalidUsername;
  static MissingApiKey = MissingApiKey;
  static NotAuthorized = NotAuthorized;
  static MissingHeader = MissingHeader;
  static InvalidHeader = InvalidHeader;
  static GenericError = GenericError;
  static QueryError = QueryError;
}
