import withCatchAsyncError from "../../async-catch";
import { PayloadValidationResponse } from "../../shared";

type Location = "cookie" | "request body";

export default class PayloadValidator {
  static passwordExists(password: string, location: Location) {
    if (!password || typeof password !== "string") {
      throw {
        type: PayloadValidationResponse.PASSWORD_MISSING,
      };
    }
  }

  static usernameExists(username: string, location: Location) {
    if (!username || typeof username !== "string") {
      throw { type: PayloadValidationResponse.USERNAME_MISSING };
    }
  }

  static sessionTokenExists(session_token: string) {
    if (!session_token || typeof session_token !== "string") {
      throw { type: PayloadValidationResponse.NOT_LOGGED_IN };
    }
  }

  static filePathExists(filePath: string) {
    if (!filePath || typeof filePath !== "string") {
      throw { type: PayloadValidationResponse.FILEPATH_MISSING };
    }
  }

  static fileContentExists(fileContent: string) {
    if (!fileContent || typeof fileContent !== "string") {
      throw { type: PayloadValidationResponse.FILE_CONTENT_MISSING };
    }
  }
}
