import Mongoose from "../..";
import Err from "../../../response/err";

export default async function InitUserDir(username: string) {
  await Mongoose.UserDir.insertOne({ username, objects: [] }).catch(handleError);
}

function handleError(error: any) {
  throw Err.MongooseQueryError(error);
}
