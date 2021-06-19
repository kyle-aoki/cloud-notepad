import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../crypto/generate-session-token";
import hashPassword from "../../crypto/hash-password";
import Query from "../../sql/query";
import sendResponse from "../../response/send-response";
import Validator from "../../validation/general";
import { cookieOptions } from "../../utility/session-token-constants";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  Validator.validateUsername(username);
  Validator.validatePassword(password);

  const hashedPassword = hashPassword(password);
  await Query.verifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await Query.setSessionToken(username, hashedPassword, session_token);

  res.cookie("username", username, cookieOptions);
  res.cookie("session_token", session_token, cookieOptions);

  sendResponse(res, { type: "LOG_IN_SUCCESS", message: "Successfully logged in." });
}
