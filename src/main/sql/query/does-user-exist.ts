import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const doesUserExistSQL = "SELECT username FROM users WHERE username = $1;";

export default async function doesUserExist(username: string): Promise<void> {
  const result = await SQL.query(doesUserExistSQL, [username]).catch(handleError);
  if (result.rows.length !== 0) throw ErrorResponse.UserAlreadyExists();
}

const handleError = (error: any) => {
  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
