import { Request, Response, NextFunction } from "express";
import sendResponse from "../../success-response/send-response";
import SuccessResponse from "../../success-response/class";
import Query from "../../sql/query";
import Validator from "../../validation";

export default async function DoesUserExist(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  Validator.validateUsername(username);

  await Query.doesUserExist(username);

  sendResponse(res, SuccessResponse.UserDoesNotExist());
}
