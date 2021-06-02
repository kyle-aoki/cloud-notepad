import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../success-response";
import SuccessResponse from "../../../success-response/class";

export default async function AuthenticateWithSessionToken(req: Request, res: Response, next: NextFunction) {
  sendResponse(res, SuccessResponse.UserIsAuthentic());
}
