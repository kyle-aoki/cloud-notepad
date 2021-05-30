import SQL from "../pool";
import ErrorResponse from "../../error-response/class";
import Logger from "../../log";

const createUserSQL = `
  insert into users (username, password) values ($1, $2);
`;

type CreateUserQuery = (username: string, password: string) => Promise<void>;

const createUserQuery: CreateUserQuery = async (username, password) => {
  await SQL.query(createUserSQL, [username, password]).catch(handleCreateUserQueryError);
};

const handleCreateUserQueryError = (error: any) => {
  if (error.code === "23505") throw ErrorResponse.UserAlreadyExists();

  Logger.error(JSON.stringify(error));
  throw ErrorResponse.QueryError();
};

export default createUserQuery;
