import Mongo from "../..";
import Err from "../../../response/err";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import getFileSize, { getCanonicalFilePath } from "../../../utility/file";

export default async function CreateFile(username: string, fileName: string, filePath: string[], fileContent: string) {
  const fileSize = getFileSize(fileContent);
  const lastModified = Date.now();
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  const UserDirMetadata = { fileName, filePath, fileSize, lastModified };
  const NewFile = { CanonicalFilePath, fileContent };

  // File Metadata Already Exists
  const file = await Mongo.UserDir.findOne({
    username,
    objects: { $elemMatch: { filePath, fileName } },
  }).catch(handleError);
  if (file) throw new Err(FileResponse.FILE_ALREADY_EXISTS);

  // File exists in FileContent but not in UserDir --> Corrupted
  const corruptFile = await Mongo.Files.findOne({ path: CanonicalFilePath }).catch(handleError);
  if (corruptFile) await Mongo.Files.deleteOne({ path: CanonicalFilePath }).catch(handleError);

  await Mongo.UserDir.updateOne({ username }, { $push: { objects: UserDirMetadata } }).catch(handleError);
  await Mongo.Files.insertOne(NewFile).catch(handleError);

  const newUserDir = await Mongo.UserDir.findOne({ username }).catch(handleError);
  return newUserDir.objects;
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
