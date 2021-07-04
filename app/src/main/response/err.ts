import Log from "../log";
import { GenericError } from "@cloud-notepad/cloud-notepad-response";

export default class Err {
  type: any;
  statusCode: number | undefined;

  constructor(type: any, statusCode?: number) {
    this.type = type;
    this.statusCode = statusCode;
  }

  static MongooseQueryError(error: any) {
    Log.error("An error occured with Mongoose.", error);
    return new Err(GenericError.SOMETHING_WENT_WRONG);
  }

  static SQLQueryError(error: any) {
    Log.error("An error occured with SQL.", error);
    return new Err(GenericError.SOMETHING_WENT_WRONG);
  }

  static GenericError() {
    return new Err(GenericError.SOMETHING_WENT_WRONG);
  }
}
