import { Request, Response, NextFunction } from "express";
import Log from "../log";

const correctApiKey = process.env.USER_API_API_KEY;

if (!correctApiKey) {
  Log.error("Missing 'USER_API_API_KEY' Environment Variable.");
  process.exit(1);
}

export default async function ApiKeyAuthentication(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api_key"];

  if (!apiKey) throw { statusCode: 401, message: "Missing header 'api_key'." };
  if (apiKey !== correctApiKey) throw { statusCode: 401, message: "Incorrect value for header 'api_key'." };

  next();
}
