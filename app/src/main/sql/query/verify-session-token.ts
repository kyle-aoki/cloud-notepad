import SQL from "../pool";
import Err from "../../response/err";
import { POSTGRESQL_INTERVAL_STRING } from "../../utility/session-token-constants";

const verifySessionTokenSQL = `
  SELECT username
  FROM users 
  WHERE username = $1 AND
  session_token = $2 AND
  session_token_timestamp > (now() - INTERVAL '${POSTGRESQL_INTERVAL_STRING}');
`;

export default async function verifySessioinToken(username: string, session_token: string) {
  const result = await SQL.query(verifySessionTokenSQL, [username, session_token]).catch(handleError);
  if (result.rows.length === 0) throw { statusCode: 401, message: "User unauthorized." };
}

const handleError = (error: any) => {
  throw Err.QueryError(error);
};
