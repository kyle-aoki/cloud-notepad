import { Request, Response, NextFunction } from "express";

export interface ErrorResponseEntity {
  ok: false;
  message: string;
  type?: string;
}

export interface ErrorMessageObject {
  message: string;
  statusCode?: number;
  type?: string;
}

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
