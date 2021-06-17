import { Request, Response, NextFunction } from "express";
import Query from "../sql/query";
import Validator from "../validation";

export default async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username as string;
  const session_token = req.headers.session_token as string;

  if (!username || typeof username !== "string") throw "Missing string 'username' from header.";
  Validator.validateSessionToken(session_token);

  await Query.verifySessioinToken(username, session_token);

  next();
}
