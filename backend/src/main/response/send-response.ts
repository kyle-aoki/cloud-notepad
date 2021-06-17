import { Response } from "express";

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

export default function sendResponse(res: Response, responseMessage: ResponseMessage, data?: any) {
  const responseEntity: ResponseEntity = { ok: true, ...responseMessage };

  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
}
