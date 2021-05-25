import { Severity } from "../log";

export interface ErrorMessageObject {
  message: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
  statusCode?: number;
}

const referDocsite = "Refer to '/documentation' for documentation.";

class ErrorResponse {
  static RouteDoesNotExist(url: string): ErrorMessageObject {
    const msg = `Route '${url}' does not exist. ${referDocsite}`;
    return { message: msg, statusCode: 404 };
  }

  static IncorrectHttpMethod(url: string, incorrectRoute: string, correctRoute: string): ErrorMessageObject {
    const msg = `${incorrectRoute} is the INCORRECT HTTP method for route '${url}'. Use ${correctRoute} instead. ${referDocsite}`;
    return { message: msg, statusCode: 404 };
  }

  static InvalidRequestPayload(url: string): ErrorMessageObject {
    const msg = `Invalid request payload for route '${url}'. ${referDocsite}`;
    return { message: msg };
  }
}

export default ErrorResponse;
