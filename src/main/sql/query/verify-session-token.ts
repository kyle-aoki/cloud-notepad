import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const verifySessionTokenSQL = `
  SELECT username FROM users 
  WHERE session_token = $1 AND 
  username = $2 AND
  session_token_timestamp > (now() - INTERVAL '1 day');
`;

export default async function verifySessioinToken(session_token: string, username: string): Promise<void> {
  const result = await SQL.query(verifySessionTokenSQL, [session_token, username]).catch(handleError);
  if (result.rows.length !== 1) throw ErrorResponse.NotAuthorized();
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
