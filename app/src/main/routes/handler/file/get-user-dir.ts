import { Request, Response, NextFunction } from "express";
import MongoQuery from "../../../mongo/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import PayloadValidator from "../../../validation/payload";

export default async function GetUserDir(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const userDir = await MongoQuery.GetUserDir(username);

  sendResponse(res, { userDir });
}
