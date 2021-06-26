import withCatchAsyncError from "../../../async-catch";
import CreateFile from "./create-file";
import DeleteFile from "./delete-file";
import GetFile from "./get-file";
import GetUserDir from "./get-user-dir";

class FileHandler {
  static CreateFile = CreateFile;
  static GetFile = GetFile;
  static GetUserDir = GetUserDir;
  static DeleteFile = DeleteFile;
}

export default FileHandler;
