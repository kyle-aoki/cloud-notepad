import Log from "../log";

export default class Err {
  static QueryError(error: any) {
    Log.error("Error occured with query.", error);
    return { message: "Something went wrong." };
  }

  static GenericError() {
    return { message: "Something went wrong." };
  }
}
