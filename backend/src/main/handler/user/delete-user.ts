import { Request, Response, NextFunction } from "express";
import hashPassword from "../../crypto/hash-password";
import Query from "../../sql/query";
import sendResponse from "../../response/send-response";
import PayloadValidator from "../../validation/payload";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username as string;
  const password = req.body.password;
  const session_token = req.cookies.session_token as string;

  PayloadValidator.usernameExists(username, "cookie");
  PayloadValidator.sessionTokenExists(session_token);
  PayloadValidator.passwordExists(password, "request body");

  const hashedPassword = hashPassword(password);

  await Query.deleteUser(username, hashedPassword, session_token);

  sendResponse(res, { message: "Successfully deleted user." });
}
