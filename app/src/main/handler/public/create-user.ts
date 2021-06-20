import { Request, Response, NextFunction } from "express";
import sendResponse from "../../response/send-response";
import Query from "../../sql/query";
import hashPassword from "../../crypto/hash-password";
import PayloadValidator from "../../validation/payload";
import Validator from "../../validation/general";

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username, "request body");
  PayloadValidator.passwordExists(password, "request body");

  Validator.validateUsername(username);
  Validator.validatePassword(password);

  await Query.doesUserExist(username);

  const hashedPassword = hashPassword(password);
  await Query.createUser(username, hashedPassword);

  next();
}
