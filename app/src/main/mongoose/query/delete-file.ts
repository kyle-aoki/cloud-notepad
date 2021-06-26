import Mongoose from "..";
import Err from "../../response/err";
import { FileResponse } from "../../shared";
import getCanonicalFilePath from "../../utility/full-file-path";

export default async function DeleteFile(username: string, filePath: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, filePath);

  await Mongoose.UserDir.updateOne({ username }, { $pull: { objects: filePath } }).catch(handleError);
  await Mongoose.Files.deleteOne({ path: CanonicalFilePath }).catch(handleError);

  const newUserDir = await Mongoose.UserDir.findOne({ username });
  return newUserDir.objects;
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
