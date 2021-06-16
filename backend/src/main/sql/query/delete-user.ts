import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Log from "../../log";

const deleteUserSQL = `
  DELETE FROM users 
  WHERE username = $1 AND
  password = $2 AND
  session_token = $3 AND
  session_token_timestamp > (now() - INTERVAL '1 day');
`;

export default async function deleteUser(username: string, hashedPassword: string, session_token: string) {
  const result = await SQL.query(deleteUserSQL, [username, hashedPassword, session_token]).catch(handleError);
  if (result.rowCount !== 1) throw { message: "Failed to delete user.", statusCode: 500 };
}

const handleError = (error: any) => {
  Log.error("Error deleting user.", error);
  throw ErrorResponse.QueryError();
};
