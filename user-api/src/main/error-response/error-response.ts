import {
  IncorrectApiKey,
  IncorrectHttpMethod,
  InvalidRequestPayload,
  MissingApiKey,
  RouteDoesNotExist,
} from "./response";

class ErrorResponse {
  static InvalidRequestPayload = InvalidRequestPayload;
  static IncorrectHttpMethod = IncorrectHttpMethod;
  static RouteDoesNotExist = RouteDoesNotExist;
  static IncorrectApiKey = IncorrectApiKey;
  static MissingApiKey = MissingApiKey;
}

export default ErrorResponse;
