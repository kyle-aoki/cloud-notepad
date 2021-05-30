import createUser from './create-user';
import { Request, Response, NextFunction } from "express";

const catchAsyncError = (func: Function) => {
  const catcher = (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  }
  return catcher;
}

interface Indexable extends Function { [x: string]: any }

function withCatchAsyncError(constructor: Indexable) {
  for (const key of Object.keys(constructor)) {
    if (typeof constructor[key] === 'function') {
      constructor[key] = catchAsyncError(constructor[key]);
    }
  }
}

@withCatchAsyncError
export default class V1Handler {
  static createUser = createUser;
}
