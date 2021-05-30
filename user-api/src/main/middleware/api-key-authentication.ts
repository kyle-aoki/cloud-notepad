import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import Logger from "../log";

const correctApiKey = process.env.USER_API_API_KEY;

if (!correctApiKey) {
  Logger.error("Missing 'USER_API_API_KEY' Environment Variable.");
  process.exit(1);
}

export default async function ApiKeyAuthentication(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["apikey"];

  if (!apiKey) throw ErrorResponse.MissingApiKey();

  if (apiKey !== correctApiKey) throw ErrorResponse.IncorrectApiKey();

  next();
}
