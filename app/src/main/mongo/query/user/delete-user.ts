import Mongo from "../..";
import Err from "../../../response/err";
import { DeleteUserResponse } from "@cloud-notepad/cloud-notepad-response";

export default async function DeleteUser(username: string, hashedPassword: string) {
  const potentialUser = await Mongo.User.deleteOne({ username, hashedPassword }).catch(handleError);
  if (!potentialUser) throw new Err(DeleteUserResponse.INCORRECT_PASSWORD);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
