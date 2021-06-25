import { Request, Response, NextFunction } from "express";
import SQLQuery from "../../sql/query";
import hashPassword from "../../crypto/hash-password";
import PayloadValidator from "../../validation/payload";
import Validator from "../../validation/general";
import MongooseQuery from "../../mongoose/class";

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username, "request body");
  PayloadValidator.passwordExists(password, "request body");

  Validator.validateUsername(username);
  Validator.validatePassword(password);

  await SQLQuery.doesUserExist(username);

  const hashedPassword = hashPassword(password);
  await SQLQuery.createUser(username, hashedPassword);

  await MongooseQuery.InitUserDir(username);

  next();
}
