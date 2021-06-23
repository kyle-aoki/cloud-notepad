import CreateUser from "./public/create-user";
import LogIn from "./public/log-in";
import CheckUsername from "./public/check-username";
import AuthenticateWithSessionToken from "./user/authenticate-with-session-token";
import withCatchAsyncError from "../async-catch";
import DeleteUser from "./user/delete-user";

@withCatchAsyncError
class Handler {
  static CreateUser = CreateUser;
  static LogIn = LogIn;
  static AuthenticateWithSessionToken = AuthenticateWithSessionToken;
  static DeleteUser = DeleteUser;
  static CheckUsername = CheckUsername;
}

export default Handler;
