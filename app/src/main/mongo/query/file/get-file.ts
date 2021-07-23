import Mongo from "../..";
import Err from "../../../response/err";
import { FileResponse } from "@cloud-notepad/cloud-notepad-response";
import { getCanonicalFilePath } from "../../../utility/file";

export default async function GetFile(username: string, fileName: string, filePath: string[]) {
  const CanonicalFilePath = getCanonicalFilePath(username, fileName, filePath);

  const file = await Mongo.Files.findOne({ CanonicalFilePath }).catch(handleError);
  if (!file) throw { type: FileResponse.FILE_NOT_EXIST };

  return file.fileContent;
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
