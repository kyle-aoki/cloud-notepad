import { Request, Response, NextFunction } from "express";
import Err from "../response/err";
import { AuthError } from "@cloud-notepad/cloud-notepad-response";
import MongoQuery from "../mongo/class";

export namespace Middleware {
  export async function SessionTokenAuthorization(req: Request, res: Response, next: NextFunction) {
    const username = req.cookies.username as string;
    const session_token = req.cookies.session_token as string;

    if (!username || !session_token) throw new Err(AuthError.UNAUTHORIZED, 401);

    await MongoQuery.VerifySessionToken(username, session_token);

    next();
  }
}
