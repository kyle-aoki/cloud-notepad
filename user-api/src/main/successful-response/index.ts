import { Response } from "express";
import Logger from "../log";
import SuccessfulResponse from "./class";
import { ResponseEntity } from "./types";

const sendResponse = (res: Response, successfulResponse: SuccessfulResponse) => {
  const responseEntity: ResponseEntity = { ok: true };

  // if (successfulResponse && successfulResponse.serverMessage) {
  //   Logger.log(successfulResponse.serverMessage.severity, successfulResponse.serverMessage.message);
  // }

  // if (successfulResponse && successfulResponse.message) {
  //   responseEntity.message = successfulResponse.message;
  // }

  // if (successfulResponse.data) responseEntity.data = successfulResponse.data;

  res.status(200).send(responseEntity);
};

export default sendResponse;
