import { Severity } from "../log";

export interface ErrorResponseEntity {
  ok: false;
  message: string;
  type?: string;
}

export interface ErrorMessageObject {
  message: string;
  statusCode?: number;
  type?: string;
}

export interface ResponseEntity {
  ok: true;
  message?: string;
  type?: string;
  data?: any;
}

export interface ResponseMessage {
  type?: string;
  message: string;
}
