import withCatchAsyncError from "../async-catch";
import Log from "../log";
import PayloadValidator from "../validation/payload";
import Query from "../sql/query";
import { Request, Response, NextFunction } from "express";

const CLOUD_NOTEPAD_API_KEY = process.env.CLOUD_NOTEPAD_API_KEY;

if (!CLOUD_NOTEPAD_API_KEY) {
  Log.error("Missing 'CLOUD_NOTEPAD_API_KEY' Environment Variable.");
  process.exit(1);
}

@withCatchAsyncError
export default class Middleware {
  static async SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
    const username = req.cookies.username as string;
    const session_token = req.cookies.session_token as string;

    PayloadValidator.usernameExists(username, "cookie");
    PayloadValidator.sessionTokenExists(session_token);

    await Query.verifySessioinToken(username, session_token);

    next();
  }

  static async ApiKeyAuthentication(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["api_key"];

    if (!apiKey) throw { statusCode: 401, type: "MISSING_API_KEY" };
    if (apiKey !== CLOUD_NOTEPAD_API_KEY) throw { statusCode: 401, type: "INCORRECT_API_KEY" };

    next();
  }
}
