import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import Query from "../sql/query";

export default async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username;
  const session_token = req.headers.session_token;

  if (!username || !session_token ) throw ErrorResponse.NotAuthorized();
  if (typeof username !== "string" || typeof session_token !== "string") throw ErrorResponse.NotAuthorized();

  await Query.verifySessioinToken(username, session_token);

  next();
}
