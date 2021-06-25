import { Request, Response, NextFunction } from "express";
import Mongoose from "../../../mongoose";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "../../../shared";
import PayloadValidator from "../../../validation/payload";

export default async function CreateFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const filePath = req.body.filePath;
  const fileBody = req.body.fileBody;

  PayloadValidator.filePathExists(filePath);
  PayloadValidator.fileBodyExists(fileBody);

  await MongooseQuery.CreateFile(username, filePath, fileBody);

  sendResponse(res, { type: FileResponse.FILE_SAVED });
}
