import { Request, Response, NextFunction } from "express";
import Log from "../log";
import { inDevelopment, inStaging } from "../utility/environment";

export interface ErrorResponseEntity {
  ok: false;
}

export default function errorResponse(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.statusCode || 400);
  delete error.statusCode;

  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    ...error,
  };

  if (inDevelopment || inStaging) Log.error("", errorResponseEntity);

  res.send(errorResponseEntity);
}
