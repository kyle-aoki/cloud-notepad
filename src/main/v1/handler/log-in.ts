import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../crypto/generate-session-token";
import hashPassword from "../../crypto/hash-password";
import Query from "../../sql/query";
import sendResponse from "../../success-response/send-response";
import SuccessResponse from "../../success-response/class";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = hashPassword(password);
  await Query.verifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await Query.setSessionToken(session_token, username, hashedPassword);

  sendResponse(res, SuccessResponse.SuccessfulLogIn(), { username, session_token });
}
