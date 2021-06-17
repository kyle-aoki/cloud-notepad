import { Request, Response, NextFunction } from "express";
import Query from "../sql/query";

export default async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username as string;
  const session_token = req.headers.session_token as string;

  await Query.verifySessioinToken(username, session_token);

  next();
}
