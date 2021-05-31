import { Request, Response, NextFunction } from "express";
import { Indexable } from "../types";

const catchAsyncError = (func: Function) => {
  const funcWithCatchAsyncError = (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
  return funcWithCatchAsyncError;
};

const withCatchAsyncError = (constructor: Indexable) => {
  for (let key of Object.keys(constructor)) {
    if (typeof constructor[key] === 'function') {
      constructor[key] = catchAsyncError(constructor[key]);
    }
  }
}

export default withCatchAsyncError;
