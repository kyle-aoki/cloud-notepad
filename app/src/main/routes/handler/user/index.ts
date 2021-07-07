import CreateUser from "./create-user";
import LogIn from "./log-in";
import CheckUsername from "./check-username";
import AuthenticateWithSessionToken from "./authenticate";
import DeleteUser from "./delete-user";
import CheckPassword from "./check-password";

class UserHandler {
  static CreateUser = CreateUser;
  static LogIn = LogIn;
  static AuthenticateWithSessionToken = AuthenticateWithSessionToken;
  static DeleteUser = DeleteUser;
  static CheckUsername = CheckUsername;
  static CheckPassword = CheckPassword;
}

export default UserHandler;
