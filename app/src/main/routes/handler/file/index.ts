import CreateFile from "./create-file";
import DeleteFile from "./delete-file";
import GetFile from "./get-file";
import GetUserDir from "./get-user-dir";
import SaveFile from "./save-file";

class FileHandler {
  static CreateFile = CreateFile;
  static GetFile = GetFile;
  static GetUserDir = GetUserDir;
  static DeleteFile = DeleteFile;
  static SaveFile = SaveFile;
}

export default FileHandler;
