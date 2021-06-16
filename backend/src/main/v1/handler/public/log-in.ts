import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../../crypto/generate-session-token";
import hashPassword from "../../../crypto/hash-password";
import Query from "../../../sql/query";
import sendResponse from "../../../success-response/send-response";
import Validator from "../../../validation";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  Validator.validateUsername(username);
  Validator.validatePassword(password);

  const hashedPassword = hashPassword(password);
  await Query.verifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await Query.setSessionToken(username, hashedPassword, session_token);

  sendResponse(res, { type: "LOG_IN_SUCCESS", message: "Successfully logged in." }, { username, session_token });
}
