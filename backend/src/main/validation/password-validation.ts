const ValidPasswordSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_`~!@#$%^&*()+[]{}|;:'?/>.<,".split("");

export const pwMaxLength = 100;
export const pwMinLength = 3;

export default function validatePassword(password: string) {

  if (password.length >= pwMaxLength) throw `String 'password' is too long. ${pwMaxLength} is the maximum length.`;
  if (password.length <= pwMinLength) throw `String 'password' is too short. ${pwMinLength} is the minimum length.`;

  const passwordCharacters = password.split("");
  for (const passwordCharacter of passwordCharacters) {
    if (ValidPasswordSymbols.includes(passwordCharacter)) continue;
    throw {
      type: "INVALID_PASSWORD_SYMBOLS_PRESENT",
      message: `Password contains invalid characters. Password cannot have the symbol '${passwordCharacter}'.`,
    };
  }
}
