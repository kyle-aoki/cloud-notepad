import { ErrorMessageObject } from "../../types/response";

export default function InvalidHeader(requiredHeader: string, headerType: string): ErrorMessageObject {
  const msg = `Header '${requiredHeader}' must be of type '${headerType}'.`;
  return { statusCode: 400, message: msg };
}
