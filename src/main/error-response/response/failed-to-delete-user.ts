import { ErrorMessageObject } from "../../types/response";

const FailedToDeleteUser = (): ErrorMessageObject => {
  const msg = "Failed to delete user. Something went wrong with user deletion.";
  return { message: msg, statusCode: 500 };
};

export default FailedToDeleteUser;
