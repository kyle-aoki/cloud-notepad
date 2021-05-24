import { Response } from "express";
import logger, { Severity } from "../log";

interface ResponseEntity {
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

const sendResponse = (res: Response, messageObject?: MessageObject, data?: any) => {
  const responseEntity: ResponseEntity = { ok: true };

  if (messageObject && messageObject.serverMessage) {
    logger.log(messageObject.serverMessage.severity, messageObject.serverMessage.message);
  }

  if (messageObject && messageObject.message) {
    responseEntity.message = messageObject.message;
  }

  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
};

export default sendResponse;
