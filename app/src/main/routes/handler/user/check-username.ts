import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../response/send-response";
import Validator from "../../../validation/general";
import MongoQuery from "../../../mongo/class";

export default async function CheckUsername(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  Validator.validateUsername(username);

  await MongoQuery.DoesUserExist(username);

  sendResponse(res);
}
