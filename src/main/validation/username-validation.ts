import ErrorResponse from "../error-response/class";
import { InvalidUsernameType } from "../error-response/response/invalid-username";
import Logger from "../log";

// Dash and lowercase alphabet
const ValidSymbols = "-abcdefghijklmnopqrstuvwxyz".split("");

if (ValidSymbols.length !== 27) {
  Logger.error("ValidSymbols variable has been corrupted.");
  process.exit(1);
}

export const usernameMaxLength = 100;
export const usernameMinLength = 4;

export default function validateUsername(username: string) {
  if (username.length >= usernameMaxLength) throw ErrorResponse.InvalidUsername(InvalidUsernameType.TOO_LONG);
  if (username.length <= usernameMinLength) throw ErrorResponse.InvalidUsername(InvalidUsernameType.TOO_SHORT);
  const usernameLetters = username.split("");
  for (const usernameLetter of usernameLetters) {
    if (ValidSymbols.includes(usernameLetter)) continue;
    throw ErrorResponse.InvalidUsername(InvalidUsernameType.NUMBERS_OR_SYMBOLS_PRESENT);
  }
}
