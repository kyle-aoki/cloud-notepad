import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const doesUserExistSQL = "SELECT username FROM users WHERE username = $1 and password = $2;";

export default async function doesUserExist(username: string, password: string): Promise<boolean> {
  const result = await SQL.query(doesUserExistSQL, [username, password]).catch(handleError);
  if (result.rows.length === 0) return false;
  return true;
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
