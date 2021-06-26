import Mongoose from "..";
import Err from "../../response/err";
import { FileResponse } from "../../shared";
import getCanonicalFilePath from "../../utility/full-file-path";

export default async function SaveFile(username: string, filePath: string, fileContent: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, filePath);

  const File = await Mongoose.Files.findOne({ path: CanonicalFilePath }).catch(handleError);
  if (!File) throw { type: FileResponse.FILE_NOT_EXIST };

  await Mongoose.Files.updateOne({ path: CanonicalFilePath }, { $set: { content: fileContent } }).catch(handleError);
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
