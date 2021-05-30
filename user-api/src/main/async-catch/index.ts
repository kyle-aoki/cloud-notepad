import { Request, Response, NextFunction } from "express";
import { Indexable } from "../types";

const catchAsyncError = (func: Function) => {
  const funcWithCatchAsyncError = (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
  return funcWithCatchAsyncError;
};

const withCatchAsyncError = (handlers: Function[]) => {
  const handlersWithAsyncCatch: Indexable = {};
  for (let handler of handlers) {
    handlersWithAsyncCatch[handler.name] = catchAsyncError(handler);
  }
  return handlersWithAsyncCatch;
};

export default withCatchAsyncError;
