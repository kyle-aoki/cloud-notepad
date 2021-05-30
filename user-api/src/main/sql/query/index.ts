import createUser from "./create-user";
import doesUserExist from "./does-user-exist";
import verifyPassword from "./verify-password";
import setSessionToken from "./set-session-token";
import verifySessioinToken from './verify-session-token';

const Query = {
  createUser,
  doesUserExist,
  verifyPassword,
  setSessionToken,
  verifySessioinToken
};

export default Query;
