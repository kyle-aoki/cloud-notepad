import { Request, Response, NextFunction } from "express";

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

  res.send(errorResponseEntity);
}
