import Mongoose from "..";
import Err from "../../response/err";
import { FileResponse } from "../../shared";
import getCanonicalFilePath from "../../utility/full-file-path";

export default async function GetFile(username: string, filePath: string) {
  const CanonicalFilePath = getCanonicalFilePath(username, filePath);

  const file = await Mongoose.Files.findOne({ path: CanonicalFilePath }).catch(handleError);
  if (!file) throw { type: FileResponse.FILE_NOT_EXIST };

  return file.contents;
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
