import { ValidateFunction } from "ajv";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/error-response";
import createUserValidator from "../request-schema/create-user-request-schema";

interface Route {
  method: string;
  payloadValidator: ValidateFunction<any>;
}

interface RequestSchemaUrlMap {
  [x: string]: Route;
}

const requestSchemaURLMap: RequestSchemaUrlMap = {
  "/create-user": { method: "POST", payloadValidator: createUserValidator },
};

const requestSchemaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const method: string = req.method;
  const url: string = req.url;

  const route = requestSchemaURLMap[url];
  if (!route) return next(ErrorResponse.RouteDoesNotExist(url));

  if (route.method !== method) return next(ErrorResponse.IncorrectHttpMethod(url, method, route.method));

  if (method !== 'GET') {
    const payload = req.body;
    const payloadIsValid = route.payloadValidator(payload);
    if (!payloadIsValid) return next(ErrorResponse.InvalidRequestPayload(url));
  }

  next();
};

export default requestSchemaMiddleware;
