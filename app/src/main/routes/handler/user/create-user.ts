import { Request, Response, NextFunction } from "express";
import hashPassword from "../../../cryptography/hash-password";
import PayloadValidator from "../../../validation/payload";
import Validator from "../../../validation/general";
import MongooseQuery from "../../../mongoose/class";

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username);
  PayloadValidator.passwordExists(password);

  Validator.validateUsername(username);
  Validator.validatePassword(password);

  await MongooseQuery.DoesUserExist(username);

  const hashedPassword = hashPassword(password);
  await MongooseQuery.CreateUser(username, hashedPassword);

  await MongooseQuery.InitUserDir(username);

  next();
}
