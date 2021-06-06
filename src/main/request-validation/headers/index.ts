import ErrorResponse from "../../error-response/class";

export enum HeaderType {
  string = "string",
  object = "object",
}

export interface RequiredHeaderSchema {
  [headerName: string]: HeaderType;
}

export type HeaderValidator = (headers: any) => void;

function validateHeader(headers: any, requiredHeader: string, headerType: HeaderType) {
  const headerValue = headers[requiredHeader];

  if (!headerValue) throw ErrorResponse.MissingHeader(requiredHeader);
  if (typeof headerValue !== headerType) throw ErrorResponse.InvalidHeader(requiredHeader, headerType);
}

function validateRequestHeaders(headers: any, requiredHeaderSchema: RequiredHeaderSchema) {
  for (const requiredHeader in requiredHeaderSchema) {
    const requiredHeaderType = requiredHeaderSchema[requiredHeader];
    validateHeader(headers, requiredHeader, requiredHeaderType);
  }
}

export function createHeaderValidatorFunction(requiredHeaderSchema: RequiredHeaderSchema) {
  function headerValidator(headers: any) {
    validateRequestHeaders(headers, requiredHeaderSchema);
  }
  return headerValidator;
}
