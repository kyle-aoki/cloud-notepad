import { Response } from "express";

export interface ResponseEntity {
  ok: true;
  data?: any;
}

export default function sendResponse(res: Response, responseMessage: any, data?: any) {
  const responseEntity: ResponseEntity = { ok: true, ...responseMessage };

  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
}
