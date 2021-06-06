import ErrorResponse from "../error-response/class";
import { InvalidUsernameType } from "../error-response/response/invalid-username";

const ValidSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_".split("");

export const usernameMaxLength = 100;
export const usernameMinLength = 2;

export default function validateUsername(username: string) {
  if (username.length >= usernameMaxLength) throw ErrorResponse.InvalidUsername(InvalidUsernameType.TOO_LONG);
  if (username.length <= usernameMinLength) throw ErrorResponse.InvalidUsername(InvalidUsernameType.TOO_SHORT);
  const usernameLetters = username.split("");
  for (const usernameLetter of usernameLetters) {
    if (ValidSymbols.includes(usernameLetter)) continue;
    throw ErrorResponse.InvalidUsername(InvalidUsernameType.INVALID_SYMBOLS_PRESENT);
  }
}
