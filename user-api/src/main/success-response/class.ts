import SuccessfullyDeletedUser from './response/successfully-deleted-user';
import SuccessfulLogIn from './response/successfully-logged-in';
import UserCreatedResponse from './response/user-created-response';
import UserIsAuthentic from './response/user-is-authentic';

class SuccessResponse {
  static UserCreatedResponse = UserCreatedResponse;
  static SuccessfulLogIn = SuccessfulLogIn;
  static UserIsAuthentic = UserIsAuthentic;
  static SuccessfullyDeletedUser = SuccessfullyDeletedUser;
}

export default SuccessResponse;
