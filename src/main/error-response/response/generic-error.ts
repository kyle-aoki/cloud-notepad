import { ErrorMessageObject } from "../../types/response";

export default function GenericError(): ErrorMessageObject {
  const msg = "Something went wrong.";
  return { statusCode: 500, message: msg };
}
