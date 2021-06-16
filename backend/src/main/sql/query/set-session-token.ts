import ErrorResponse from "../../error-response/class";
import Logger from "../../log";
import SQL from "../pool";

const setSessionTokenSQL = `
  UPDATE users 
  SET session_token = $1, 
  session_token_timestamp = now()
  WHERE username = $2 
  AND password = $3;
`;

export default async function setSessionToken(sessionToken: string, username: string, password: string) {
  await SQL.query(setSessionTokenSQL, [sessionToken, username, password]).catch(handleError);
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.FailedToSetSessionToken();
};
