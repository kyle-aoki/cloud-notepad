import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const verifyPasswordSQL = "SELECT username FROM users WHERE username = $1 and password = $2;";

export default async function verifyPassword(username: string, password: string): Promise<void> {
  const result = await SQL.query(verifyPasswordSQL, [username, password]).catch(handleError);
  if (result.rows.length !== 1) throw ErrorResponse.IncorrectUsernameOrPassword();
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
