import { ErrorMessageObject } from "../../types/response";

const UserAlreadyExists = (): ErrorMessageObject => {
  const msg = "User already exists.";
  return { type: "UserAlreadyExists", message: msg };
};

export default UserAlreadyExists;
