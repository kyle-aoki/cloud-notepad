import { Request, Response, NextFunction } from "express";
import Log from "../log";
import { inDevelopment, inStaging } from "../utility/environment";

interface ErrorResponseEntity {
  ok: false;
  type: any;
}

export default function errorResponse(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.statusCode || 400);

  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    type: error.type,
  };

  if (inDevelopment || inStaging) Log.error(JSON.stringify(errorResponseEntity), error);

  res.send(errorResponseEntity);
}
