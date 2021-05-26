import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/error-response";
import Logger from "../log";

const correctApiKey = process.env.USER_API_API_KEY;

if (!correctApiKey) {
  Logger.error("Missing 'USER_API_API_KEY' Environment Variable.");
  process.exit(1);
}

const apiKeyAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["apikey"];

  if (!apiKey) next(ErrorResponse.MissingApiKey());

  if (apiKey !== correctApiKey) next(ErrorResponse.IncorrectApiKey());

  next();
};

export default apiKeyAuthenticationMiddleware;
