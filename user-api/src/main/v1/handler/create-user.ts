import { Request, Response, NextFunction } from "express";
import sendResponse from "../../successful-response";

import createUserQuery from "../../sql/query/create-user";
import SuccessfulResponse from "../../successful-response/class";

export default function createUser(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  createUserQuery(username, password);

  sendResponse(res, new SuccessfulResponse())
}
