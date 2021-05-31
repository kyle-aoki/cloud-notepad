import { Request, Response, NextFunction } from "express";
import Query from "../../../sql/query";
import sendResponse from "../../../success-response";
import SuccessResponse from "../../../success-response/class";

export default async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;
  const session_token = req.cookies.session_token;

  await Query.deleteUser(session_token, username);

  sendResponse(res, SuccessResponse.SuccessfullyDeletedUser());
}
