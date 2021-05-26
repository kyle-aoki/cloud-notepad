import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
import Logger from "../log";
import { ErrorMessageObject, ErrorResponseEntity } from "./types";

const errorHandler = (error: ErrorMessageObject, req: Request, res: Response, next: NextFunction) => {
  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    message: error.message,
  };

  if (error.serverMessage) {
    if (process.env.NODE_ENV !== "prod") console.log(chalk.bold.red(error.serverMessage));
    Logger.log(error.serverMessage.severity, error.serverMessage.message);
  }

  if (error.statusCode) res.status(error.statusCode);
  res.send(errorResponseEntity);
};

export default errorHandler;
