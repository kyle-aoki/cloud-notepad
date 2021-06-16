import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Log from "../../log";

const doesUserExistSQL = "SELECT username FROM users where username = $1;";

export default async function doesUserExist(username: string) {
  const result = await SQL.query(doesUserExistSQL, [username]).catch(handleError);
  if (result.rows.length !== 0) throw { message: "User already exists.", type: "USER_EXISTS" };
}

const handleError = (error: any) => {
  Log.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
