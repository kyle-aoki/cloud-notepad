import CreateUser from "./create-user";
import LogIn from "./log-in";
import CheckUsername from "./check-username";
import AuthenticateWithSessionToken from "./authenticate";
import DeleteUser from "./delete-user";
import CheckPassword from "./check-password";

const UserHandler = {
  CreateUser,
  LogIn,
  CheckUsername,
  AuthenticateWithSessionToken,
  DeleteUser,
  CheckPassword,
};

export default UserHandler;
