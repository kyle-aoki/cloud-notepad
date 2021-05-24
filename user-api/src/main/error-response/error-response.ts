import { Severity } from "../log";

export interface ErrorMessageObject {
  message: string;
  serverMessage?: {
    severity: Severity,
    message: string;
  }
}

class ErrorResponse {
  static InvalidRequestPayload(str: string): ErrorMessageObject {
    const msg = `Invalid request payload for route '${str}'. Refer to https://github.com/kyle-aoki/user-api-monorepo.`;
    return { message: msg };
  }
}

export default ErrorResponse;
