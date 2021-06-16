import { ErrorMessageObject } from "../../types/response";

export default function MissingHeader(requiredHeader: string): ErrorMessageObject {
  const msg = `Header '${requiredHeader}' is missing from request.`;
  return { statusCode: 400, message: msg };
}
