import createUser from "./create-user";
import logIn from "./log-in";
import authenticateWithSessionToken from "./user/authenticate-with-session-token";
import withCatchAsyncError from "../../async-catch";

const V1HandlerList: Function[] = [createUser, logIn, authenticateWithSessionToken];
const V1Handler = withCatchAsyncError(V1HandlerList);

export default V1Handler;
