import createUser from "./create-user";
import doesUserExist from "./does-user-exist";

export default class Query {
  static createUser = createUser;
  static doesUserExist = doesUserExist;
}
