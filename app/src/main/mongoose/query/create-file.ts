import Mongoose from "..";
import Err from "../../response/err";
import { FileResponse } from "../../shared";
import getCanonicalFilePath from "../../utility/full-file-path";

export default async function CreateFile(username: string, filePath: string, fileContent: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, filePath);
  const NewFile = { path: CanonicalFilePath, contents: fileContent };

  // File already exists
  const file = await Mongoose.UserDir.findOne({ username, objects: { $in: [filePath] } }).catch(handleError);
  if (file) throw { type: FileResponse.FILE_ALREADY_EXISTS };

  // File exists in FileContent but not in UserDir
  const corruptFile = await Mongoose.Files.findOne({ path: CanonicalFilePath }).catch(handleError);
  if (corruptFile) await Mongoose.Files.deleteOne({ path: CanonicalFilePath }).catch(handleError);

  await Mongoose.UserDir.updateOne({ username }, { $push: { objects: filePath } }).catch(handleError);
  await Mongoose.Files.insertOne(NewFile).catch(handleError);

  const newUserDir = await Mongoose.UserDir.findOne({ username });
  return newUserDir.objects;
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
