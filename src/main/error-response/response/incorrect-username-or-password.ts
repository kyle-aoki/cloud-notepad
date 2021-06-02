import { ErrorMessageObject } from "../types";

const IncorrectUsernameOrPassword = (): ErrorMessageObject => {
  const msg = "Incorrect username or password.";
  return { message: msg };
};

export default IncorrectUsernameOrPassword;
