import Mongoose from "../..";
import Err from "../../../response/err";
import { CheckUsernameResponse } from "@cloud-notepad/cloud-notepad-response";

export default async function DoesUserExist(username: string) {
  const potentialUser = await Mongoose.User.findOne({ username }).catch(handleError);
  if (potentialUser) throw new Err(CheckUsernameResponse.USER_EXISTS);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
