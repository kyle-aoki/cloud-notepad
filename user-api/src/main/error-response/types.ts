import { Severity } from "../log";

export interface ErrorMessageObject {
  message: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
  statusCode?: number;
}

export interface ErrorResponseEntity {
  ok: false;
  message: string;
}
