import { Request, Response, NextFunction } from "express";
import sendResponse from "../../success-response";
import SuccessResponse from "../../success-response/class";
import Query from "../../sql/query";

export default async function createUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  await Query.doesUserExist(username);

  await Query.createUser(username, password);

  sendResponse(res, SuccessResponse.UserCreatedResponse());
}
