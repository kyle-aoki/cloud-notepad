import withCatchAsyncError from "../async-catch";
import Log from "../log";
import PayloadValidator from "../validation/payload";
import SQLQuery from "../sql/query";
import { Request, Response, NextFunction } from "express";

const CLOUD_NOTEPAD_API_KEY = process.env.CLOUD_NOTEPAD_API_KEY;

if (!CLOUD_NOTEPAD_API_KEY) {
  Log.error("Missing 'CLOUD_NOTEPAD_API_KEY' Environment Variable.");
  process.exit(1);
}

export default class Middleware {
  static async SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
    const username = req.cookies.username as string;
    const session_token = req.cookies.session_token as string;

    PayloadValidator.usernameExists(username, "cookie");
    PayloadValidator.sessionTokenExists(session_token);

    await SQLQuery.verifySessioinToken(username, session_token);

    next();
  }
}
