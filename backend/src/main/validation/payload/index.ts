type Location = "cookie" | "request body";

export default class PayloadValidator {
  static passwordExists(password: string, location: Location) {
    if (!password || typeof password !== "string") {
      throw { type: "PASSWORD_MISSING", message: `Missing string 'password' from ${location}.` };
    }
  }
  static usernameExists(username: string, location: Location) {
    if (!username || typeof username !== "string") {
      throw { type: "USERNAME_MISSING", message: `Missing 'username' from ${location}.` };
    }
  }
  static sessionTokenExists(session_token: string) {
    if (!session_token || typeof session_token !== "string") {
      throw { type: "NOT_LOGGED_IN", message: "Missing 'session_token' cookie." };
    }
  }
}
