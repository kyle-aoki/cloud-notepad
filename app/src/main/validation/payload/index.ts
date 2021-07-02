import Err from "../../response/err";
import { PayloadValidationResponse } from "@cloud-notepad/cloud-notepad-response";

export default class PayloadValidator {
  static passwordExists(password: string) {
    if (this.notTruthyOrNotString(password)) throw new Err(PayloadValidationResponse.PASSWORD_MISSING);
  }

  static usernameExists(username: string) {
    if (this.notTruthyOrNotString(username)) throw new Err(PayloadValidationResponse.USERNAME_MISSING);
  }

  static sessionTokenExists(session_token: string) {
    if (this.notTruthyOrNotString(session_token)) throw new Err(PayloadValidationResponse.NOT_LOGGED_IN);
  }

  static fileNameExists(fileName: string) {
    if (this.notTruthyOrNotString(fileName)) throw new Err(PayloadValidationResponse.FILEPATH_MISSING);
  }

  static filePathExists(filePath: string) {
    if (this.notTruthyOrNotObject(filePath)) throw new Err(PayloadValidationResponse.FILEPATH_MISSING);
  }

  static fileContentExists(fileContent: string) {
    if (this.notTruthyOrNotString(fileContent)) throw new Err(PayloadValidationResponse.FILE_CONTENT_MISSING);
  }

  static notTruthyOrNotObject(obj: any) {
    return !obj || !this.isObject(obj);
  }

  static notTruthyOrNotString(obj: any) {
    return !obj || !this.isString(obj);
  }

  static isString(maybeString: any) {
    return typeof maybeString === "string";
  }

  static isObject(maybeObject: any) {
    return typeof maybeObject === "object";
  }
}
