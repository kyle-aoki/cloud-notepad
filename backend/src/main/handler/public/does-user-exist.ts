import { Request, Response, NextFunction } from "express";
import Query from "../../sql/query";
import sendResponse from "../../response/send-response";
import Validator from "../../validation";

export default async function DoesUserExist(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  Validator.validateUsername(username);

  await Query.doesUserExist(username);

  sendResponse(res, { message: "User does not exist.", type: "NOT_EXIST" });
}
