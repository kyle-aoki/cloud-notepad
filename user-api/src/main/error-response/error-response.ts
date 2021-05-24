import { Severity } from "../log";

export interface ErrorMessageObject {
  message: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
  statusCode?: number;
}

class ErrorResponse {
  static RouteDoesNotExist(url: string): ErrorMessageObject {
    const msg = `Route '${url}' does not exist. Refer to https://github.com/kyle-aoki/user-api-monorepo.`;
    return { message: msg, statusCode: 404 };
  }

  static IncorrectHttpMethod(url: string, incorrectRoute: string, correctRoute: string): ErrorMessageObject {
    const msg = `${incorrectRoute} is the INCORRECT HTTP method for route '${url}'. Use ${correctRoute} instead. Refer to https://github.com/kyle-aoki/user-api-monorepo.`;
    return { message: msg, statusCode: 404 };
  }
  
  static InvalidRequestPayload(url: string): ErrorMessageObject {
    const msg = `Invalid request payload for route '${url}'. Refer to https://github.com/kyle-aoki/user-api-monorepo.`;
    return { message: msg };
  }
}

export default ErrorResponse;
