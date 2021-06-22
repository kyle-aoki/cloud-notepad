import { Request, Response, NextFunction } from "express";
import Log from "../log";

interface Indexable {
  [x: string]: any;
}

const catchAsyncError = (func: Function) => {
  const funcWithCatchAsyncError = (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
  return funcWithCatchAsyncError;
};

// Decorator
const withCatchAsyncError = (constructor: Indexable) => {
  for (let key of Object.keys(constructor)) {
    if (typeof constructor[key] === "function") {
      constructor[key] = catchAsyncError(constructor[key]);
    }
  }
};

export default withCatchAsyncError;
