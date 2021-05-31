import CreateUser from "./create-user";
import LogIn from "./log-in";
import AuthenticateWithSessionToken from "./user/authenticate-with-session-token";
import withCatchAsyncError from "../../async-catch";
import DeleteUser from "./user/delete-user";

@withCatchAsyncError
class V1Handler {
  static CreateUser = CreateUser;
  static LogIn = LogIn;
  static AuthenticateWithSessionToken = AuthenticateWithSessionToken;
  static DeleteUser = DeleteUser;
}

export default V1Handler;
