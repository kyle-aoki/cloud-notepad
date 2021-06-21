import { ValidationResponse } from "../../shared";

export default class Validator {
  static maxLength: number = 100;
  static minLength: number = 3;

  static ValidUsernameSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_".split("");
  static ValidPasswordSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_`~!@#$%^&*()+[]{}|;:'?/>.<,".split("");

  static validateUsername(username: string) {
    if (!username) throw { type: ValidationResponse.USERNAME_MISSING };
    if (username.length >= this.maxLength) throw { type: ValidationResponse.USERNAME_LONG, maxLength: this.maxLength };
    if (username.length <= this.minLength) throw { type: ValidationResponse.USERNAME_SHORT, minLength: this.minLength };

    const usernameLetters = username.split("");
    for (const usernameLetter of usernameLetters) {
      if (this.ValidUsernameSymbols.includes(usernameLetter)) continue;
      throw { type: ValidationResponse.INVALID_USERNAME_SYMBOLS, validSymbols: "-_".split("") };
    }
  }

  static validatePassword(password: string) {
    if (!password) throw { type: ValidationResponse.PASSWORD_MISSING };
    if (password.length >= this.maxLength) throw { type: ValidationResponse.PASSWORD_LONG, maxLength: this.maxLength };
    if (password.length <= this.minLength) throw { type: ValidationResponse.PASSWORD_SHORT, minLength: this.minLength };

    const passwordCharacters = password.split("");
    for (const passwordCharacter of passwordCharacters) {
      if (this.ValidPasswordSymbols.includes(passwordCharacter)) continue;
      throw {
        type: ValidationResponse.INVALID_PASSWORD_SYMBOLS,
        validSymbols: "`~!@#$%^&*()+[]{}|;:'?/>.<,".split(""),
      };
    }
  }
}
