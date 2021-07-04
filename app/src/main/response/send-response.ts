import { Response } from "express";

export interface ResponseEntity {
  ok: true;
  data?: any;
}
// Happy path --> will always recieve { ok: true }.
export default function sendResponse(res: Response, data?: any) {
  const responseEntity: ResponseEntity = { ok: true };
  if (data) responseEntity.data = data;

  res.status(200).send(responseEntity);
}
