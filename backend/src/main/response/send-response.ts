import { Response } from "express";
import { ResponseMessage, ResponseEntity } from "../types/response";

export default function sendResponse(res: Response, responseMessage: ResponseMessage, data?: any) {
  const responseEntity: ResponseEntity = { ok: true, ...responseMessage };

  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
}
