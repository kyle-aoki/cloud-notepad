import { Request, Response, NextFunction } from "express";

interface ErrorResponseEntity {
  ok: false;
  type: any;
}

// Not on Happy Path --> Will always recieve { ok: false } and { type: ErrorType }.
export default function errorResponse(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.statusCode || 200);

  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    type: error.type,
  };

  res.locals.errType = error.type;
  res.send(errorResponseEntity);
}
