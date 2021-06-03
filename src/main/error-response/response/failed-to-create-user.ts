import { ErrorMessageObject } from "../../types/response";

const FailedToCreateUser = (): ErrorMessageObject => {
  const msg = "Failed to create user. Something went wrong with user creation.";
  return { message: msg, statusCode: 500 };
};

export default FailedToCreateUser;
