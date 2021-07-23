import Mongo from "../..";
import Err from "../../../response/err";
import { LogInResponse } from '@cloud-notepad/cloud-notepad-response';

export default async function VerifyPassword(username: string, hashedPassword: string) {
  const potentialUser = await Mongo.User.findOne({ username, hashedPassword }).catch(handleError);
  if (!potentialUser) throw new Err(LogInResponse.INCORRECT_UN_OR_PW);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
