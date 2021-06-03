import { Request, Response, NextFunction } from "express";
import Logger from "../log";
import { ErrorMessageObject, ErrorResponseEntity } from "../types/response";

const errorHandler = (error: ErrorMessageObject, req: Request, res: Response, next: NextFunction) => {
  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    message: error.message,
  };

  if (error.serverMessage) Logger.log(error.serverMessage.severity, error.serverMessage.message);

  res.status(error.statusCode || 400);
  res.send(errorResponseEntity);
};

export default errorHandler;