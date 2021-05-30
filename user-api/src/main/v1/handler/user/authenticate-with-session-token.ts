import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../success-response";

export default async function authenticateWithSessionToken(req: Request, res: Response, next: NextFunction) {
  sendResponse(res, { message: "Authentic." });
}
