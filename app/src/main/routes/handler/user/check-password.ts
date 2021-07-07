import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../response/send-response";
import Validator from "../../../validation/general";
import { CheckUsernameResponse } from "@cloud-notepad/cloud-notepad-response";
import MongooseQuery from "../../../mongoose/class";
import PayloadValidator from "../../../validation/payload";

export default async function CheckPassword(req: Request, res: Response, next: NextFunction) {
  const password = req.body.password;
  PayloadValidator.passwordExists(password);
  Validator.validatePassword(password);

  sendResponse(res);
}
