import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../../types/response";

const NotAuthorized = (): ErrorMessageObject => {
  const msg = `Missing or incorrect 'session_token' and 'username' headers. ${referDocsite}`;
  return { message: msg, statusCode: 401 };
};

export default NotAuthorized;
