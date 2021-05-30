import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import Query from "../sql/query";

export default async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const session_token = req.cookies.session_token;
  const username = req.cookies.username;

  if (!session_token || !username) ErrorResponse.NotAuthorized();

  await Query.verifySessioinToken(session_token, username);

  next();
}
