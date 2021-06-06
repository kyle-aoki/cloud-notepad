import { Severity } from "../log";

export interface ErrorResponseEntity {
  ok: false;
  message: string;
}

export interface ErrorMessageObject {
  message: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
  statusCode?: number;
}

export interface SuccessResponseEntity {
  ok: true;
  message?: string;
  data?: any;
}

export interface SuccessMessageObject {
  message?: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
}
