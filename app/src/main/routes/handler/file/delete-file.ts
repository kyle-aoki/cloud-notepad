import { Request, Response, NextFunction } from "express";
import Mongoose from "../../../mongoose";
import MongooseQuery from "../../../mongoose/class";
import sendResponse from "../../../response/send-response";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import PayloadValidator from "../../../validation/payload";

export default async function DeleteFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const fileName = req.body.fileName;
  const filePath = req.body.filePath;

  PayloadValidator.fileNameExists(fileName);
  PayloadValidator.filePathExists(filePath);

  const newUserDir = await MongooseQuery.DeleteFile(username, fileName, filePath);

  sendResponse(res, { newUserDir });
}
