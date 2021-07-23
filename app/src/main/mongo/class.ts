import CreateFile from "./query/file/create-file";
import DeleteFile from "./query/file/delete-file";
import GetFile from "./query/file/get-file";
import GetUserDir from "./query/file/get-user-dir";
import InitUserDir from "./query/file/init-user-dir";
import SaveFile from "./query/file/save-file";
import CreateUser from "./query/user/create-user";
import DeleteUser from "./query/user/delete-user";
import DoesUserExist from "./query/user/does-user-exist";
import SetSessionToken from "./query/user/set-session-token";
import VerifyPassword from "./query/user/verify-password";
import VerifySessionToken from "./query/user/verify-session-token";

export default class MongoQuery {
  static InitUserDir = InitUserDir;
  static CreateFile = CreateFile;
  static GetFile = GetFile;
  static GetUserDir = GetUserDir;
  static DeleteFile = DeleteFile;
  static SaveFile = SaveFile;
  static CreateUser = CreateUser;
  static DeleteUser = DeleteUser;
  static DoesUserExist = DoesUserExist;
  static VerifyPassword = VerifyPassword;
  static SetSessionToken = SetSessionToken;
  static VerifySessionToken = VerifySessionToken;
}
