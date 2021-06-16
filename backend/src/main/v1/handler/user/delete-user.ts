import { Request, Response, NextFunction } from "express";
import hashPassword from "../../../crypto/hash-password";
import Query from "../../../sql/query";
import sendResponse from "../../../success-response/send-response";
import Validator from "../../../validation";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username as string;
  const password = req.body.password;
  const session_token = req.headers.session_token as string;

  Validator.validateUsername(username);
  Validator.validatePassword(password);
  Validator.validateSessionToken(session_token);

  const hashedPassword = hashPassword(password);

  await Query.deleteUser(username, hashedPassword, session_token);

  sendResponse(res, { message: "Successfully deleted user." });
}
