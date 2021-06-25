import CreateFile from "./query/create-file";
import GetFile from "./query/get-file";
import InitUserDir from "./query/init-user-dir";

export default class MongooseQuery {
  static InitUserDir = InitUserDir;
  static CreateFile = CreateFile;
  static GetFile = GetFile;
}
