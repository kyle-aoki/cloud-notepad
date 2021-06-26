import Log from "../log";
import { GenericError } from "../shared";

export default class Err {
  type: any;
  payload?: any;

  constructor(type: any, payload?: any) {
    this.type = type;
    this.payload = payload;
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
