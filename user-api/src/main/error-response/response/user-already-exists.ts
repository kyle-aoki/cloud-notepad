import { ErrorMessageObject } from "../types";

const UserAlreadyExists = (): ErrorMessageObject => {
  const msg = "User already exists.";
  return { statusCode: 400, message: msg };
};

export default UserAlreadyExists;
