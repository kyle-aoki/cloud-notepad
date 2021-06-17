import passwordExists from "./password";
import sessionTokenExists from "./session_token";
import usernameExists from "./username";

export default class PayloadValidator {
  static passwordExists = passwordExists;
  static usernameExists = usernameExists;
  static sessionTokenExists = sessionTokenExists;
}
