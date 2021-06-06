import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import requestSchema from "../request-validation";

export default async function ValidateRequest(req: Request, res: Response, next: NextFunction) {
  const method = req.method;
  const url = req.url;

  const route = requestSchema[url];
  if (!route) throw ErrorResponse.RouteDoesNotExist(req.originalUrl);

  if (route.method !== method) throw ErrorResponse.IncorrectHttpMethod(url, method, route.method);

  route.validateHeaders(req.headers);

  if (method === "GET") return next();

  route.validatePayload(req);

  next();
}
