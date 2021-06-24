import { Request, Response, NextFunction } from "express";
import fileDB from "../../mongoose";
import sendResponse from "../../response/send-response";
import mongodb from "mongodb";
import Mongoose from "../../mongoose";

export default async function CreateFile(req: Request, res: Response, next: NextFunction) {
  const files = Mongoose.FilesCollection;
  const all = files.find();
  for await (const doc of all) {
    console.log(doc);
  }
  res.send("ok");
}
