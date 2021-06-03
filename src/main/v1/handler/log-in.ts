import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../crypto/generate-session-token";
import hashPassword from "../../crypto/hash-password";
import { oneDayInMilliseconds } from "../../misc/session-token-age";
import Query from "../../sql/query";
import sendResponse from "../../success-response";
import SuccessResponse from "../../success-response/class";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = hashPassword(password);
  await Query.verifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await Query.setSessionToken(session_token, username, hashedPassword);

  res.cookie('username', username, { maxAge: oneDayInMilliseconds });
  res.cookie("session_token", session_token, { maxAge: oneDayInMilliseconds });
  sendResponse(res, SuccessResponse.SuccessfulLogIn());
}
