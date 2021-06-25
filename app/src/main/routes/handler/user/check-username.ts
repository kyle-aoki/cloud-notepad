import { Request, Response, NextFunction } from "express";
import SQLQuery from "../../../sql/query";
import sendResponse from "../../../response/send-response";
import Validator from "../../../validation/general";
import { CheckUsernameResponse } from "../../../shared";

export default async function CheckUsername(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  Validator.validateUsername(username);
  
  await SQLQuery.doesUserExist(username);

  sendResponse(res, { type: CheckUsernameResponse.USER_DOES_NOT_EXIST });
}
