import Mongoose from "..";
import Log from "../../log";
import Err from "../../response/err";

export default async function GetFile(username: string, filePath: string) {
  const fullFilePath = `${username}${filePath}`;

  const file = await Mongoose.FileContents.findOne({ path: fullFilePath }).catch(handleError);

  return file.contents;
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
