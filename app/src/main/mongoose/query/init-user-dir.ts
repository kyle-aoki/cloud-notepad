import Mongoose from "..";
import Log from "../../log";
import Err from "../../response/err";

export default async function InitUserDir(username: string) {
  await Mongoose.UserDir.insertOne({ username, objects: [] }).catch(handleError);
}

function handleError(error: any) {
  throw Err.QueryError(error);
}
