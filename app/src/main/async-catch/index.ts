import { Request, Response, NextFunction } from "express";
import Log from "../log";
import { inDevelopment, inStaging } from "../utility/environment";

interface Indexable {
  [x: string]: any;
}

function isStackTraceError(error: Error) {
  return Object.keys(error).length === 0;
}

function catchAsyncError(func: Function) {
  const funcWithCatchAsyncError = (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: any) => {
      if (isStackTraceError(err)) {
        Log.stackTrace(err);
        err.type = "STACK_TRACE_ERROR";
      }
      next(err);
    });
  };
  return func;
}

// Decorator
function withCatchAsyncError(constructor: Indexable) {
  for (let key of Object.keys(constructor)) {
    if (typeof constructor[key] === "function") {
      constructor[key] = catchAsyncError(constructor[key]);
    }
  }
}

export default withCatchAsyncError;
