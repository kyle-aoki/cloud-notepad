import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import Mongo from "../..";
import Err from "../../../response/err";
import getFileSize, { getCanonicalFilePath, getFilePath } from "../../../utility/file";

export default async function SaveFile(username: string, fileName: string, filePath: string[], fileContent: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  const fileSize = getFileSize(fileContent);
  const lastModified = Date.now();

  const userDir = await Mongo.UserDir.findOne({ username });
  let foundFile = false;

  for (let obj of userDir.objects) {
    if (obj.fileName === fileName && getFilePath(obj.filePath) === getFilePath(filePath)) {
      foundFile = true;
      obj.fileSize = fileSize;
      obj.lastModified = lastModified;
    }
  }
  if (!foundFile) throw new Err(FileResponse.FILE_NOT_EXIST);

  await Mongo.UserDir.replaceOne({ username }, userDir).catch(handleError);

  await Mongo.Files.updateOne({ CanonicalFilePath }, { $set: { fileContent } }).catch(handleError);
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
