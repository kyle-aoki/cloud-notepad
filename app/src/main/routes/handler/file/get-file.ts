import { Request, Response, NextFunction } from "express";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "../../../shared";
import PayloadValidator from "../../../validation/payload";

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const filePath = req.body.filePath;

  PayloadValidator.filePathExists(filePath);

  const fileContents = await MongooseQuery.GetFile(username, filePath);

  sendResponse(res, { type: FileResponse.FILE_SENT, data: { fileContents } });
}
