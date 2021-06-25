import withCatchAsyncError from "../../../async-catch";
import CreateFile from "./create-file";
import GetFile from "./get-file";

class FileHandler {
  static CreateFile = CreateFile;
  static GetFile = GetFile;
}

export default FileHandler;
