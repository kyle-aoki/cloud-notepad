import Mongoose from "..";
import Log from "../../log";
import Err from "../../response/err";

export default async function GetUserDir(username: string) {
  const file = await Mongoose.UserDir.findOne({ username }).catch(handleError);
  return file.objects;
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
