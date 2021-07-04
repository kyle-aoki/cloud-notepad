import { Request, Response, NextFunction } from "express";
import generateSessionToken from "../../../cryptography/generate-session-token";
import hashPassword from "../../../cryptography/hash-password";
import sendResponse from "../../../response/send-response";
import { cookieOptions } from "../../../utility/session-token-constants";
import PayloadValidator from "../../../validation/payload";
import MongooseQuery from "../../../mongoose/class";

export default async function LogIn(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  PayloadValidator.usernameExists(username);
  PayloadValidator.passwordExists(password);

  const hashedPassword = hashPassword(password);
  await MongooseQuery.VerifyPassword(username, hashedPassword);

  const session_token = generateSessionToken();
  await MongooseQuery.SetSessionToken(username, hashedPassword, session_token);

  res.cookie("username", username, cookieOptions);
  res.cookie("session_token", session_token, cookieOptions);

  sendResponse(res, { username });
}
