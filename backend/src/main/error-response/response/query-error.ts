import { ErrorMessageObject } from "../../types/response";

const QueryError = (): ErrorMessageObject => {
  const msg = "Something went wrong.";
  return { statusCode: 500, message: msg };
};

export default QueryError;
