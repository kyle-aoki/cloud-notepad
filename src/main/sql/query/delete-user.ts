import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const deleteUserSQL = `
  DELETE FROM users 
  WHERE session_token = $1 AND
  username = $2 AND
  session_token_timestamp > (now() - INTERVAL '1 day');
`;

export default async function deleteUser(session_token: string, username: string): Promise<void> {
  const result = await SQL.query(deleteUserSQL, [session_token, username]).catch(handleError);
  console.log(result);
  if (result.rowCount !== 1) throw ErrorResponse.FailedToDeleteUser();
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
