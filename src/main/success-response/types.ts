import { Severity } from "../log";

export interface ResponseEntity {
  ok: true;
  message?: string;
  data?: any;
}

export interface MessageObject {
  message?: string;
  serverMessage?: {
    severity: Severity;
    message: string;
  };
}