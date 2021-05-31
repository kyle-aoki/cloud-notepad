import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../error-response/class";
import routeMetadata from "../route-metadata";

export default async function ValidateRequestSchema(req: Request, res: Response, next: NextFunction) {
  const method: string = req.method;
  const url: string = req.url;

  const route = routeMetadata[url];
  if (!route) throw ErrorResponse.RouteDoesNotExist(req.originalUrl);

  if (route.method !== method) throw ErrorResponse.IncorrectHttpMethod(url, method, route.method);

  if (method === "GET") return next();

  route.validatePayload(req);

  next();
}
