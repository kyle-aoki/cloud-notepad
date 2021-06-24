import { Request, Response, NextFunction } from "express";
import Mongoose from "../../mongoose";

export default async function CreateFile(req: Request, res: Response, next: NextFunction) {
  const files = Mongoose.FilesCollection;
  const file = await files.findOne({ fileName: "hello" });
  res.send(file);
}
