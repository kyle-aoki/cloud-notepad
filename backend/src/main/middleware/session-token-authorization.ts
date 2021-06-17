import { Request, Response, NextFunction } from "express";
import Query from "../sql/query";
import Validator from "../validation/general";
import PayloadValidator from "../validation/payload";

export default async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username as string;
  const session_token = req.cookies.session_token as string;

  PayloadValidator.usernameExists(username, "cookie");
  PayloadValidator.sessionTokenExists(session_token);

  await Query.verifySessioinToken(username, session_token);

  next();
}
