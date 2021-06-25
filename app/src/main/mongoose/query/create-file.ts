import Mongoose from "..";
import Log from "../../log";
import Err from "../../response/err";
import { FileResponse } from "../../shared";

export default async function CreateFile(username: string, filePath: string, fileContents: string) {
  const fullFilePath = `${username}${filePath}`;
  const fileObject = { path: fullFilePath, contents: fileContents };

  const query = { username };
  const update = { $push: { objects: filePath } };

  await Mongoose.UserDir.updateOne(query, update).catch(handleUpdateUserDirError);
  await Mongoose.FileContents.insertOne(fileObject).catch(handleInsertNewFileError);
}

function handleUpdateUserDirError(error: any) {
  throw Err.QueryError(error);
}

function handleInsertNewFileError(error: any) {
  if (error.code === 11000) throw { type: FileResponse.FILE_ALREADY_EXISTS };
  throw Err.QueryError(error);
}
