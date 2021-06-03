import { usernameMaxLength, usernameMinLength } from "../../validation/username-validation";
import { ErrorMessageObject } from "../../types/response";

export enum InvalidUsernameType {
  TOO_LONG = "TOO_LONG",
  TOO_SHORT = "TOO_SHORT",
  NUMBERS_OR_SYMBOLS_PRESENT = "NUMBERS_OR_SYMBOLS_PRESENT",
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
        message: `Username too short. Must be smaller than ${usernameMinLength} characters.`,
        statusCode: 400,
      };
    case InvalidUsernameType.NUMBERS_OR_SYMBOLS_PRESENT:
      return {
        message: "Username contains invalid characters. Username cannot contain numbers or symbols, only letters.",
        statusCode: 400,
      };
    default:
      return {
        message: "Something went wrong.",
        statusCode: 500,
      };
  }
}
