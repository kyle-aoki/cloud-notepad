import Log from "../../log";
import Err from "../../response/err";
import SQL from "../pool";

const setSessionTokenSQL = `
  UPDATE users 
  SET session_token = $1,
  session_token_timestamp = now()
  WHERE username = $2 
  AND password = $3;
`;

export default async function setSessionToken(username: string, password: string, session_token: string) {
  await SQL.query(setSessionTokenSQL, [session_token, username, password]).catch(handleError);
}

const handleError = (error: any) => {
  throw Err.SQLQueryError(error);
};
