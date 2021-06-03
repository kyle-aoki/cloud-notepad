import { ErrorMessageObject } from "../../types/response";

const FailedToDeleteUser = (): ErrorMessageObject => {
  const msg = "Failed to delete user.";
  return { message: msg, statusCode: 400 };
};

export default FailedToDeleteUser;
