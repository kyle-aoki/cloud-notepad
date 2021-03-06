import { Request, Response, NextFunction } from "express";
import MongoQuery from "../../../mongo/class";
import sendResponse from "../../../response/send-response";
import PayloadValidator from "../../../validation/payload";

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const fileName = req.body.fileName;
  const filePath = req.body.filePath;

  PayloadValidator.fileNameExists(fileName);
  PayloadValidator.filePathExists(filePath);

  const fileContent = await MongoQuery.GetFile(username, fileName, filePath);

  sendResponse(res, { fileContent });
}
