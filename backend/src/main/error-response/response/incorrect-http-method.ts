import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../../types/response";

const IncorrectHttpMethod = (url: string, incorrectRoute: string, correctRoute: string): ErrorMessageObject => {
  const msg = `${incorrectRoute} is the INCORRECT HTTP method for route '${url}'. Use ${correctRoute} instead. ${referDocsite}`;
  return { message: msg, statusCode: 404 };
};

export default IncorrectHttpMethod;
