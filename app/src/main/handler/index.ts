import CreateUser from "./public/create-user";
import LogIn from "./public/log-in";
import CheckUsername from "./public/check-username";
import AuthenticateWithSessionToken from "./user/authenticate-with-session-token";
import withCatchAsyncError from "../async-catch";
import DeleteUser from "./user/delete-user";
import GetUserDir from "./storage/get-user-dir";
import SaveFile from "./storage/save-file";
import GetFile from "./storage/get-file";

@withCatchAsyncError
class V1Handler {
  static CreateUser = CreateUser;
  static LogIn = LogIn;
  static AuthenticateWithSessionToken = AuthenticateWithSessionToken;
  static DeleteUser = DeleteUser;
  static CheckUsername = CheckUsername;
  static GetUserDir = GetUserDir;
  static SaveFile = SaveFile;
  static GetFile = GetFile;
}

export default V1Handler;
