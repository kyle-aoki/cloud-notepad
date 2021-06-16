import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Log from "../../log";

const createUserSQL = "INSERT INTO users (username, password) VALUES ($1, $2);";

export default async function createUser(username: string, password: string): Promise<void> {
  await SQL.query(createUserSQL, [username, password]).catch(handleError);
}

const handleError = (error: any) => {
  Log.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};
