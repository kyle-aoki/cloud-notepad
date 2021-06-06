import ErrorResponse from "../error-response/class";
import { InvalidPasswordType } from "../error-response/response/invalid-password";

const ValidPasswordSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_`~!@#$%^&*()+[]{}|;:'?/>.<,".split("");

export const passwordMaxLength = 100;
export const passwordMinLength = 3;

export default function validatePassword(password: string) {
  if (password.length >= passwordMaxLength) throw ErrorResponse.InvalidPassword(InvalidPasswordType.TOO_LONG);
  if (password.length <= passwordMinLength) throw ErrorResponse.InvalidPassword(InvalidPasswordType.TOO_SHORT);
  const passwordCharacters = password.split("");
  for (const passwordCharacter of passwordCharacters) {
    if (ValidPasswordSymbols.includes(passwordCharacter)) continue;
    throw ErrorResponse.InvalidPassword(InvalidPasswordType.INVALID_SYMBOLS_PRESENT);
  }
}
