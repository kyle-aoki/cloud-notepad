import createUser from "./create-user";
import doesUserExist from "./does-user-exist";
import verifyPassword from "./verify-password";
import setSessionToken from "./set-session-token";
import verifySessioinToken from "./verify-session-token";
import deleteUser from "./delete-user";

export default class SQLQuery {
  static createUser = createUser;
  static doesUserExist = doesUserExist;
  static verifyPassword = verifyPassword;
  static setSessionToken = setSessionToken;
  static verifySessioinToken = verifySessioinToken;
  static deleteUser = deleteUser;
}
