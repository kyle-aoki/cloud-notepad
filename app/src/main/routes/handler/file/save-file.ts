import { Request, Response, NextFunction } from "express";
import Mongoose from "../../../mongoose";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "../../../shared";
import PayloadValidator from "../../../validation/payload";

export default async function SaveFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const filePath = req.body.filePath;
  const fileContent = req.body.fileContent;

  PayloadValidator.filePathExists(filePath);
  PayloadValidator.fileContentExists(fileContent);

  await MongooseQuery.SaveFile(username, filePath, fileContent);

  sendResponse(res, { type: FileResponse.FILE_SAVED });
}
