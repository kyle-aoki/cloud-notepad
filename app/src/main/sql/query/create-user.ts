import SQL from "../pool";
import Log from "../../log";
import Err from "../../response/err";

const createUserSQL = "INSERT INTO users (username, password) VALUES ($1, $2);";

export default async function createUser(username: string, password: string): Promise<void> {
  await SQL.query(createUserSQL, [username, password]).catch(handleError);
}

const handleError = (error: any) => {
  throw Err.SQLQueryError(error);
};
