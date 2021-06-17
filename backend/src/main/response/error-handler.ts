import { Request, Response, NextFunction } from "express";
import { ErrorResponseEntity } from "../types/response";

export default function errorResponse(error: any, req: Request, res: Response, next: NextFunction) {
  const errorIsString = typeof error === "string";

  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    message: errorIsString ? error : error.message || "Something went wrong.",
  };

  if (error.type) errorResponseEntity.type = error.type;

  res.status(error.statusCode || 400);
  res.send(errorResponseEntity);
}
