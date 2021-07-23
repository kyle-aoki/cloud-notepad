import Mongo from "../..";
import { User } from "../../../model/user";
import Err from "../../../response/err";

export default async function CreateUser(username: string, hashedPassword: string) {
  const newUser: User = {
    username,
    hashedPassword,
    session_token: null,
    session_token_creation_timestamp: null,
  };

  await Mongo.User.insertOne(newUser).catch(handleError);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
