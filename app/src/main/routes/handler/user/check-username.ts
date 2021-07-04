import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../response/send-response";
import Validator from "../../../validation/general";
import { CheckUsernameResponse } from "@cloud-notepad/cloud-notepad-response";
import MongooseQuery from "../../../mongoose/class";

export default async function CheckUsername(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  Validator.validateUsername(username);
  
  await MongooseQuery.DoesUserExist(username);

  sendResponse(res);
}
