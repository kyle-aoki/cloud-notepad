import { Request, Response, NextFunction } from "express";
import Logger, { Severity } from "../../log";
import sendResponse from "../../response-entity";
import { CreateUserResponse } from "../../response-entity/create-user-response";

export default function createUser(req: Request, res: Response, next: NextFunction) {
  Logger.warn("watch out...");

  sendResponse(res, CreateUserResponse);
}
