import validatePassword from "./password-validation";
import validateSessionToken from "./session_token-validation";
import validateUsername from "./username-validation";

export default class Validator {
  static validateUsername = validateUsername;
  static validatePassword = validatePassword;
  static validateSessionToken = validateSessionToken;
}
