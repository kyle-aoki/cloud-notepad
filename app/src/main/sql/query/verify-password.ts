import SQL from "../pool";
import Log from "../../log";
import Err from "../../response/err";
import { LogInResponse } from "@cloud-notepad/cloud-notepad-response";

const verifyPasswordSQL = "SELECT username FROM users WHERE username = $1 and password = $2;";

export default async function verifyPassword(username: string, password: string) {
  const result = await SQL.query(verifyPasswordSQL, [username, password]).catch(handleError);
  if (result.rows.length !== 1) throw new Err(LogInResponse.INCORRECT_UN_OR_PW);
}

const handleError = (error: any) => {
  throw Err.SQLQueryError(error);
};
