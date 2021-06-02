import { ErrorMessageObject } from "../types";

const FailedToSetSessionToken = (): ErrorMessageObject => {
  const msg = "Failed to set session token. Try logging in again.";
  return { statusCode: 500, message: msg };
};

export default FailedToSetSessionToken;
