import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import Log from "../log";

const correctApiKey = process.env.USER_API_API_KEY;

if (!correctApiKey) {
  Log.error("Missing 'USER_API_API_KEY' Environment Variable.");
  process.exit(1);
}

export default function ApiKeyAuthentication(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api_key"];

  if (!apiKey) throw "Missing API Key.";
  if (apiKey !== correctApiKey) throw ErrorResponse.IncorrectApiKey();

  next();
}
