import { Request, Response, NextFunction } from "express";
import sendResponse from "../../response/send-response";
import Query from "../../sql/query";
import hashPassword from "../../crypto/hash-password";
import Validator from "../../validation";
import PayloadValidator from "../../validation/payload";

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username, "request body");
  PayloadValidator.passwordExists(password, "request body");

  await Query.doesUserExist(username);

  const hashedPassword = hashPassword(password);
  await Query.createUser(username, hashedPassword);

  sendResponse(res, { message: "User successfully created.", type: "USER_CREATED" });
}
