import CreateFile from "./query/create-file";
import DeleteFile from "./query/delete-file";
import GetFile from "./query/get-file";
import GetUserDir from "./query/get-user-dir";
import InitUserDir from "./query/init-user-dir";
import SaveFile from "./query/save-file";

export default class MongooseQuery {
  static InitUserDir = InitUserDir;
  static CreateFile = CreateFile;
  static GetFile = GetFile;
  static GetUserDir = GetUserDir;
  static DeleteFile = DeleteFile;
  static SaveFile = SaveFile;
}
