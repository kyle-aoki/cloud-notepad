import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../response/send-response";

export default async function AuthenticateWithSessionToken(req: Request, res: Response, next: NextFunction) {
  sendResponse(res);
}
