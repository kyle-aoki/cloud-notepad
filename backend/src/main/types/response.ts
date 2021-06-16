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
  type?: string;
}

export interface SuccessResponseEntity {
  ok: true;
  message?: string;
  data?: any;
  successOrigin: "user-svc";
}

export interface SuccessMessageObject {
  type?: string;
  message?: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
}
