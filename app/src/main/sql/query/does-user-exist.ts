import SQL from "../pool";

import Log from "../../log";
import Err from "../../response/err";
import { DoesUserExistResponse } from "../../shared";

const doesUserExistSQL = "SELECT username FROM users where username = $1;";

export default async function doesUserExist(username: string) {
  const result = await SQL.query(doesUserExistSQL, [username]).catch(handleError);
  if (result.rows.length !== 0) throw { type: DoesUserExistResponse.USER_EXISTS };
}

const handleError = (error: any) => {
  throw Err.QueryError(error);
};
