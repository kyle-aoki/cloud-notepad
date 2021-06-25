import { Request, Response, NextFunction } from "express";
import Mongoose from "../../mongoose";
import sendResponse from "../../response/send-response";
import { FileResponse } from "../../shared";

export default async function CreateFile(req: Request, res: Response, next: NextFunction) {
  const username = req.cookies.username;

  const filePath = req.body.filePath;
  const fileBody = req.body.fileBody;

  const fileObject = { [`${username}${filePath}`]: fileBody };

  const userDir = await Mongoose.UserDir.findOne({ username });
  userDir.objects.push(`${username}${filePath}`);
  console.log(userDir);

  await Mongoose.FileContents.insertOne(fileObject);

  sendResponse(res, { type: FileResponse.SUCCESSFULLY_SAVED_FILE });
}
