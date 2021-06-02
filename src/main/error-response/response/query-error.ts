import { ErrorMessageObject } from "../types";

const QueryError = (): ErrorMessageObject => {
  const msg = "Something went wrong.";
  return { statusCode: 500, message: msg };
};

export default QueryError;
