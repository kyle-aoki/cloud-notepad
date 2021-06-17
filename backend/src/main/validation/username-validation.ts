const ValidSymbols = "abcdefghijklmnopqrstuvwxyz1234567890-_".split("");

export const unMaxLength = 100;
export const unMinLength = 2;

export default function validateUsername(username: string, full?: boolean) {
  if (!full && (!username || typeof username !== "string")) {
    throw { type: "NOT_LOGGED_IN", message: "Missing 'session_token' cookie." };
  }

  if (username.length >= unMaxLength) throw `String 'username' is too long. ${unMaxLength} is the maximum length.`;
  if (username.length <= unMinLength) throw `String 'username' is too short. ${unMinLength} is the minimum length.`;

  const usernameLetters = username.split("");
  for (const usernameLetter of usernameLetters) {
    if (ValidSymbols.includes(usernameLetter)) continue;
    throw {
      type: "INVALID_USERNAME_SYMBOLS_PRESENT",
      message: "Username contains invalid characters. Username cannot contain symbols other than '-' and '_'.",
    };
  }
}
