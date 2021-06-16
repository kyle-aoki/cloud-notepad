import { passwordMaxLength, passwordMinLength } from "../../validation/password-validation";
import { ErrorMessageObject } from "../../types/response";

export enum InvalidPasswordType {
  TOO_LONG = "TOO_LONG",
  TOO_SHORT = "TOO_SHORT",
  INVALID_SYMBOLS_PRESENT = "INVALID_SYMBOLS_PRESENT",
}

export default function InvalidPassword(type: InvalidPasswordType): ErrorMessageObject {
  switch (type) {
    case InvalidPasswordType.TOO_LONG:
      return {
        message: `Password too long. Cannot be larger than ${passwordMaxLength} characters.`,
        statusCode: 400,
      };
    case InvalidPasswordType.TOO_SHORT:
      return {
        message: `Password too short. Must not be smaller than ${passwordMinLength} characters.`,
        statusCode: 400,
      };
    case InvalidPasswordType.INVALID_SYMBOLS_PRESENT:
      return {
        message: "Password contains invalid characters. Password cannot contain symbols '\"' and '\\'.",
        statusCode: 400,
      };
    default:
      return {
        message: "Something went wrong.",
        statusCode: 500,
      };
  }
}
