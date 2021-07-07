import { call, put, takeEvery } from 'redux-saga/effects';
import { CreateAccountModalAction, CreateAccountModalActions } from '../reducer';
import UserAPI from '../../../../api/user-api';
import { NotificationActions, NotificationType } from '../../../../notifications/redux/reducer';
import { LoggedInAs, UsernameDisplay } from '../../../../ui/username-font';
import { GenericError, ValidationResponse } from '@cloud-notepad/cloud-notepad-response';
import NotificationControl from '../../../../notifications/redux/control';
import { AccountCreationControl } from '../control';
import { AccountControl } from '../../../taskbar/menu/account/redux/control';

// Click 'Create Account' Button
function* CheckPasswordSaga(action: CreateAccountModalAction): Generator<any, any, any> {
  const NotificationController = new NotificationControl(put);
  const AccountCreationController = new AccountCreationControl(put);
  const AccountController = new AccountControl(put);

  if (action.payload.passwordLoading) return;

  yield AccountCreationController.PASSWORD_LOADING();
  const { username, password } = action.payload;

  let CheckPasswordResult;
  try {
    CheckPasswordResult = yield call(UserAPI.checkPassword, password);
  } catch (e) {
    yield NotificationController.NETWORK_ERROR();
  }

  if (!CheckPasswordResult.ok) {
    switch (CheckPasswordResult.type) {
      case ValidationResponse.INVALID_PASSWORD_SYMBOLS:
        yield NotificationController.PUSH_ERROR(`Invalid symbols in password. The symbols \\, ", and / are not permitted.`); break;
      case ValidationResponse.PASSWORD_SHORT:
        yield NotificationController.PUSH_ERROR('Password is too short.'); break;
      case ValidationResponse.PASSWORD_LONG:
        yield NotificationController.PUSH_ERROR('Password is too long.'); break;
      default:
        yield NotificationController.GENERIC_ERROR();
    }
    yield AccountCreationController.STOP_PASSWORD_LOADING();
    return;
  }

  let result;
  try {
    result = yield call(UserAPI.createUser, username, password);
  } catch (e) {
    yield NotificationController.NETWORK_ERROR();
  }

  if (result.ok) {
    yield AccountCreationController.STOP_PASSWORD_LOADING();
    yield NotificationController.PUSH_INFO(<LoggedInAs username={username} />);
    yield AccountCreationController.CLOSE_MODAL();
    yield AccountController.SET_USER(username);
    return;
  }

  yield NotificationController.GENERIC_ERROR();
  yield AccountCreationController.STOP_PASSWORD_LOADING();
}

export function* CheckPasswordSagaMiddleware() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, CheckPasswordSaga);
}
