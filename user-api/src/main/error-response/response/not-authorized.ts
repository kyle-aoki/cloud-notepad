import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../types";

const NotAuthorized = (): ErrorMessageObject => {
  const msg = `Missing or incorrect 'session_token' and 'username' cookies. ${referDocsite}`;
  return { message: msg, statusCode: 401 };
};

export default NotAuthorized;
