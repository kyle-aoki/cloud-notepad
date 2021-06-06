import { usernameMaxLength, usernameMinLength } from "../../validation/username-validation";
import { ErrorMessageObject } from "../../types/response";

export enum InvalidUsernameType {
  TOO_LONG = "TOO_LONG",
  TOO_SHORT = "TOO_SHORT",
  INVALID_SYMBOLS_PRESENT = "INVALID_SYMBOLS_PRESENT",
}

export default function InvalidUsername(type: InvalidUsernameType): ErrorMessageObject {
  switch (type) {
    case InvalidUsernameType.TOO_LONG:
      return {
        message: `Username too long. Cannot be larger than ${usernameMaxLength} characters.`,
        statusCode: 400,
      };
    case InvalidUsernameType.TOO_SHORT:
      return {
        message: `Username too short. Must not be smaller than ${usernameMinLength} characters.`,
        statusCode: 400,
      };
    case InvalidUsernameType.INVALID_SYMBOLS_PRESENT:
      return {
        message: "Username contains invalid characters. Username cannot contain symbols other than '-' and '_'.",
        statusCode: 400,
      };
    default:
      return {
        message: "Something went wrong.",
        statusCode: 500,
      };
  }
}
