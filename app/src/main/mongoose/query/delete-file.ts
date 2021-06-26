import Mongoose from "..";
import Err from "../../response/err";
import { getCanonicalFilePath } from "../../utility/file";

export default async function DeleteFile(username: string, fileName: string, filePath: string[]) {
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  await Mongoose.UserDir.updateOne({ username }, { $pull: { objects: { fileName, filePath } } }).catch(handleError);
  await Mongoose.Files.deleteOne({ CanonicalFilePath }).catch(handleError);

  const newUserDir = await Mongoose.UserDir.findOne({ username });
  return newUserDir.objects;
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
