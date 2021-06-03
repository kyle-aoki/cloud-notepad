import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../../types/response";

const MissingApiKey = (): ErrorMessageObject => {
  const msg = `Request header 'apikey' must be present on request. ${referDocsite}`;
  return { message: msg, statusCode: 401 };
};

export default MissingApiKey;
