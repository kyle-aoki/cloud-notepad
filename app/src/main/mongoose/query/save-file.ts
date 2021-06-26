import Mongoose from "..";
import Err from "../../response/err";
import getFileSize, { getCanonicalFilePath, getFilePath } from "../../utility/file";

export default async function SaveFile(username: string, fileName: string, filePath: string[], fileContent: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  const fileSize = getFileSize(fileContent);
  const lastModified = Date.now();

  const userDir = await Mongoose.UserDir.findOne({ username });
  for (let obj of userDir.objects) {
    if (obj.fileName === fileName && getFilePath(obj.filePath) === getFilePath(filePath)) {
      obj.fileSize = fileSize;
      obj.lastModified = lastModified;
    }
  }
  await Mongoose.UserDir.replaceOne({ username }, userDir);

  await Mongoose.Files.updateOne({ CanonicalFilePath }, { $set: { fileContent } }).catch(handleError);
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
