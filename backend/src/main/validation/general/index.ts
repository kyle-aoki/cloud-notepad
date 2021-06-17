export default class Validator {
  static maxLength: number = 100;
  static minLength: number = 3;

  static ValidUsernameSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_".split("");
  static ValidPasswordSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_`~!@#$%^&*()+[]{}|;:'?/>.<,".split("");

  static validateUsername(username: string) {
    if (username.length >= this.maxLength) throw { type: "USERNAME_LONG", maxLength: this.maxLength };
    if (username.length <= this.minLength) throw { type: "USERNAME_SHORT", minLength: this.minLength };

    const usernameLetters = username.split("");
    for (const usernameLetter of usernameLetters) {
      if (this.ValidUsernameSymbols.includes(usernameLetter)) continue;
      throw { type: "INVALID_USERNAME_SYMBOLS", validSymbols: "-_".split("") };
    }
  }

  static validatePassword(password: string) {
    if (password.length >= this.maxLength) throw { type: "PASSWORD_LONG", maxLength: this.maxLength };
    if (password.length <= this.minLength) throw { type: "PASSWORD_SHORT", minLength: this.minLength };

    const passwordCharacters = password.split("");
    for (const passwordCharacter of passwordCharacters) {
      if (this.ValidPasswordSymbols.includes(passwordCharacter)) continue;
      throw { type: "INVALID_PASSWORD_SYMBOLS", validSymbols: "`~!@#$%^&*()+[]{}|;:'?/>.<,".split("") };
    }
  }
}
