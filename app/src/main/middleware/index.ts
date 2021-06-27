import Log from "../log";
import PayloadValidator from "../validation/payload";
import SQLQuery from "../sql/query";
import { Request, Response, NextFunction } from "express";

export default class Middleware {
  static async SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
    const username = req.cookies.username as string;
    const session_token = req.cookies.session_token as string;

    PayloadValidator.usernameExists(username);
    PayloadValidator.sessionTokenExists(session_token);

    await SQLQuery.verifySessioinToken(username, session_token);

    next();
  }
}
