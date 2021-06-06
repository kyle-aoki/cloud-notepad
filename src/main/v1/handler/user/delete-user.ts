import { Request, Response, NextFunction } from "express";
import hashPassword from "../../../crypto/hash-password";
import Query from "../../../sql/query";
import sendResponse from "../../../success-response/send-response";
import SuccessResponse from "../../../success-response/class";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username as string;
  const session_token = req.headers.session_token as string;
  const password = req.body.password;

  const hashedPassword = hashPassword(password);

  await Query.deleteUser(session_token, username, hashedPassword);

  sendResponse(res, SuccessResponse.SuccessfullyDeletedUser());
}
