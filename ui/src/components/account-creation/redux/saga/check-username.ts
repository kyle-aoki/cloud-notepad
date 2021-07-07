import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../../api/user-api';
import { NotificationType } from '../../../../notifications/redux/reducer';
import { CreateAccountModalAction, CreateAccountModalActions } from '../reducer';
import { CheckUsernameResponse, ValidationResponse } from '@cloud-notepad/cloud-notepad-response';
import NotificationControl from '../../../../notifications/redux/control';
import { AccountCreationControl } from '../control';

// Click 'Next' button.
function* CheckUsernameSaga(action: CreateAccountModalAction): Generator<any, any, any> {
  if (!action.payload.username || action.payload.usernameLoading) return;

  const NotificationController = new NotificationControl(put);
  const AccountCreationController = new AccountCreationControl(put);

  yield AccountCreationController.USERNAME_LOADING();

  let checkUsernameResult;
  try {
    checkUsernameResult = yield call(UserAPI.checkUsername, action.payload.username);
  } catch (e) {
    return yield NotificationController.NETWORK_ERROR();
  }

  if (checkUsernameResult.ok) {
    yield AccountCreationController.STOP_USERNAME_LOADING();
    yield AccountCreationController.GO_TO_PASSWORD_SCREEN();
    return;
  }

  // prettier-ignore
  switch (checkUsernameResult.type) {
    case CheckUsernameResponse.USER_EXISTS: 
      yield NotificationController.PUSH_ERROR('That username is taken. Try another.'); break;
    case ValidationResponse.INVALID_USERNAME_SYMBOLS: 
      yield NotificationController.PUSH_ERROR('Invalid symbols in username. Can only use - and _ in username.'); break;
    case ValidationResponse.USERNAME_SHORT: 
      yield NotificationController.PUSH_ERROR('That username is too short.'); break;
    case ValidationResponse.USERNAME_LONG: 
      yield NotificationController.PUSH_ERROR('That username is too long.'); break;
    default: 
      yield NotificationController.GENERIC_ERROR();
  }
  yield AccountCreationController.STOP_USERNAME_LOADING();
}

export function* CheckUsernameSagaMiddleware() {
  yield takeEvery(CreateAccountModalActions.CHECK_USERNAME, CheckUsernameSaga);
}
