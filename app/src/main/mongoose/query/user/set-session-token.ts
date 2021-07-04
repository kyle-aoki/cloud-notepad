import Mongoose from "../..";
import Err from "../../../response/err";

export default async function SetSessionToken(username: string, hashedPassword: string, session_token: string) {
  await Mongoose.User.updateOne(
    { username, hashedPassword },
    { $set: { session_token, session_token_creation_timestamp: Date.now() } }
  ).catch(handleError);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
