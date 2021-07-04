import { Request, Response, NextFunction } from "express";
import hashPassword from "../../../cryptography/hash-password";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import PayloadValidator from "../../../validation/payload";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username as string;
  const password = req.body.password;

  PayloadValidator.usernameExists(username);
  PayloadValidator.passwordExists(password);

  const hashedPassword = hashPassword(password);

  await MongooseQuery.DeleteUser(username, hashedPassword);

  sendResponse(res);
}
