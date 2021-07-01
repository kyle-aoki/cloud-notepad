import { Request, Response, NextFunction } from "express";
import hashPassword from "../../../cryptography/hash-password";
import SQLQuery from "../../../sql/query";
import sendResponse from "../../../response/send-response";
import PayloadValidator from "../../../validation/payload";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username as string;
  const password = req.body.password;
  const session_token = req.cookies.session_token as string;

  PayloadValidator.usernameExists(username);
  PayloadValidator.sessionTokenExists(session_token);
  PayloadValidator.passwordExists(password);

  const hashedPassword = hashPassword(password);

  await SQLQuery.deleteUser(username, hashedPassword, session_token);

  sendResponse(res, { message: "Successfully deleted user." });
}
