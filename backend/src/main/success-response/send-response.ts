import { Response } from "express";
import Log from "../log";
import { SuccessMessageObject, SuccessResponseEntity } from "../types/response";

type SendResponseFunction = (res: Response, messageObject: SuccessMessageObject, data?: any) => void;

const sendResponse: SendResponseFunction = (res, messageObject, data) => {
  const responseEntity: SuccessResponseEntity = { ok: true, successOrigin: "user-svc" };

  if (messageObject && messageObject.serverMessage) {
    Log.log(messageObject.serverMessage.severity, messageObject.serverMessage.message);
  }

  if (messageObject && messageObject.message) {
    responseEntity.message = messageObject.message;
  }

  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
};

export default sendResponse;
