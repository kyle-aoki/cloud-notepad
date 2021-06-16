import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../success-response/send-response";
import SuccessResponse from "../../../success-response/class";
import Query from "../../../sql/query";
import hashPassword from "../../../crypto/hash-password";
import Validator from "../../../validation";

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  Validator.validateUsername(username, true);
  Validator.validatePassword(password, true);

  await Query.doesUserExist(username);

  const hashedPassword = hashPassword(password);
  await Query.createUser(username, hashedPassword);

  sendResponse(res, SuccessResponse.UserCreatedResponse());
}
