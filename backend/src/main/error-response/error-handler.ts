import { Request, Response, NextFunction } from "express";
import Log from "../log";
import { ErrorMessageObject, ErrorResponseEntity } from "../types/response";

const errorHandler = (error: ErrorMessageObject, req: Request, res: Response, next: NextFunction) => {
  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    errorOrigin: "user-svc",
    message: error.message || "Something went wrong.",
  };

  if (error.serverMessage) Log.log(error.serverMessage.severity, error.serverMessage.message);

  res.status(error.statusCode || 400);
  res.send(errorResponseEntity);
};

export default errorHandler;
