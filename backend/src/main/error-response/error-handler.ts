import { Request, Response, NextFunction } from "express";
import Log from "../log";
import { ErrorResponseEntity } from "../types/response";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const errorIsString = typeof error === "string";

  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    message: errorIsString ? error : error.message || "Something went wrong.",
  };

  if (error.serverMessage) Log.log(error.serverMessage.severity, error.serverMessage.message);

  res.status(error.statusCode || 400);
  res.send(errorResponseEntity);
};

export default errorHandler;
