import Mongoose from "../..";
import Err from "../../../response/err";
import { AuthError } from "@cloud-notepad/cloud-notepad-response";
import { ONE_DAY_MILLISECONDS } from "../../../utility/session-token-constants";

export default async function VerifySessionToken(username: string, session_token: string) {
  const potentialUser = await Mongoose.User.findOne({ username, session_token }).catch(handleError);
  if (!potentialUser) throw new Err(AuthError.UNAUTHORIZED);

  // If right side is bigger --> session_token is INVALID.
  const isTokenExpired = potentialUser.session_token_creation_timestamp + ONE_DAY_MILLISECONDS < Date.now();

  if (isTokenExpired) throw new Err(AuthError.UNAUTHORIZED);
}

function handleError(err: any) {
  throw Err.MongooseQueryError(err);
}
