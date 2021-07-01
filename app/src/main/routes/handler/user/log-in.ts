import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../../cryptography/generate-session-token";
import hashPassword from "../../../cryptography/hash-password";
import SQLQuery from "../../../sql/query";
import sendResponse from "../../../response/send-response";
import Validator from "../../../validation/general";
import { cookieOptions } from "../../../utility/session-token-constants";
import { LogInResponse } from "../../../shared";
import PayloadValidator from "../../../validation/payload";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username);
  PayloadValidator.passwordExists(password);

  const hashedPassword = hashPassword(password);
  await SQLQuery.verifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await SQLQuery.setSessionToken(username, hashedPassword, session_token);

  res.cookie("username", username, cookieOptions);
  res.cookie("session_token", session_token, cookieOptions);

  sendResponse(res, { type: LogInResponse.SUCCESSFUL_LOG_IN, username: username });
}
