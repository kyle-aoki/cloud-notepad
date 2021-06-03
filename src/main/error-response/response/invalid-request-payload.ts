import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../../types/response";

const InvalidRequestPayload = (url: string): ErrorMessageObject => {
  const msg = `Invalid request payload for route '${url}'. ${referDocsite}`;
  return { message: msg };
};

export default InvalidRequestPayload;
