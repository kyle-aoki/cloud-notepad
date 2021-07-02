import Mongoose from "..";
import Err from "../../response/err";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import getFileSize, { getCanonicalFilePath } from "../../utility/file";

export default async function CreateFile(username: string, fileName: string, filePath: string[], fileContent: string) {
  const fileSize = getFileSize(fileContent);
  const lastModified = Date.now();
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  const UserDirMetadata = { fileName, filePath, fileSize, lastModified };
  const NewFile = { CanonicalFilePath, fileContent };

  // File Metadata Already Exists
  const file = await Mongoose.UserDir.findOne({
    username,
    objects: { $elemMatch: { filePath, fileName } },
  }).catch(handleError);
  if (file) throw new Err(FileResponse.FILE_ALREADY_EXISTS);

  // File exists in FileContent but not in UserDir --> Corrupted
  const corruptFile = await Mongoose.Files.findOne({ path: CanonicalFilePath }).catch(handleError);
  if (corruptFile) await Mongoose.Files.deleteOne({ path: CanonicalFilePath }).catch(handleError);

  await Mongoose.UserDir.updateOne({ username }, { $push: { objects: UserDirMetadata } }).catch(handleError);
  await Mongoose.Files.insertOne(NewFile).catch(handleError);

  const newUserDir = await Mongoose.UserDir.findOne({ username });
  return newUserDir.objects;
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
