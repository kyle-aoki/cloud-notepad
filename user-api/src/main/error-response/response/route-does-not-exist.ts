import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../types";

const RouteDoesNotExist = (url: string): ErrorMessageObject => {
  const msg = `Route '${url}' does not exist. ${referDocsite}`;
  return { message: msg, statusCode: 404 };
};

export default RouteDoesNotExist;
