import SQL from "../pool";
import Log from "../../log";
import Err from "../../response/err";

const verifyPasswordSQL = "SELECT username FROM users WHERE username = $1 and password = $2;";

export default async function verifyPassword(username: string, password: string): Promise<void> {
  const result = await SQL.query(verifyPasswordSQL, [username, password]).catch(handleError);
  if (result.rows.length !== 1) throw { message: "Incorrect username or password.", type: "INCORRECT_UN_PW" };
}

const handleError = (error: any) => {
  throw Err.QueryError(error);
};
