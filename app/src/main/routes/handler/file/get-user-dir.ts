import { Request, Response, NextFunction } from "express";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import PayloadValidator from "../../../validation/payload";

export default async function GetUserDir(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const userDir = await MongooseQuery.GetUserDir(username);

  sendResponse(res, { type: FileResponse.USER_DIR_SENT, data: { userDir } });
}
