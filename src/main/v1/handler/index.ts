import CreateUser from "./create-user";
import LogIn from "./log-in";
import AuthenticateWithSessionToken from "./user/authenticate-with-session-token";
import withCatchAsyncError from "../../async-catch";
import DeleteUser from "./user/delete-user";
import DoesUserExist from "./does-user-exist";

@withCatchAsyncError
class V1Handler {
  static CreateUser = CreateUser;
  static LogIn = LogIn;
  static AuthenticateWithSessionToken = AuthenticateWithSessionToken;
  static DeleteUser = DeleteUser;
  static DoesUserExist = DoesUserExist;
}

export default V1Handler;
