import { call, put, takeEvery } from 'redux-saga/effects';
import { CreateAccountModalAction, CreateAccountModalActions } from '../reducer';
import UserAPI from '../../../../api/user-api';
import { NotificationActions, NotificationType } from '../../../../notifications/redux/reducer';
import { LoggedInAs, UsernameDisplay } from '../../../../ui/username-font';
import { GenericError, ValidationResponse } from '@cloud-notepad/cloud-notepad-response';
import NotificationControl from '../../../../notifications/redux/control';
import { AccountCreationControl } from '../control';

const BadPasswordResponses = [
  ValidationResponse.INVALID_PASSWORD_SYMBOLS,
  ValidationResponse.PASSWORD_SHORT,
  ValidationResponse.PASSWORD_LONG,
];

// Click 'Create Account' Button
function* CheckPasswordSaga(action: CreateAccountModalAction): Generator<any, any, any> {
  const NotificationController = new NotificationControl(put);
  const AccountCreationController = new AccountCreationControl(put);

  yield AccountCreationController.PASSWORD_LOADING();

  let result;
  try {
    result = yield call(UserAPI.createUser, action.payload.username, action.payload.password);
  } catch (e) {
    yield NotificationController.NETWORK_ERROR();
  }

  if (!result.ok) {
    switch (result.type) {
      case ValidationResponse.INVALID_PASSWORD_SYMBOLS:
        yield NotificationController.PUSH_ERROR('Invalid symbols in password.'); break;
      case ValidationResponse.PASSWORD_SHORT:
        yield NotificationController.PUSH_ERROR('Password is too short.'); break;
      case ValidationResponse.PASSWORD_LONG:
        yield NotificationController.PUSH_ERROR('Password is too long.'); break;
      default:
        yield NotificationController.GENERIC_ERROR();
    }
    return yield AccountCreationController.STOP_PASSWORD_LOADING();
  }

  yield put({
    type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS,
    payload: { username: result.username },
  });
  yield put({
    type: NotificationActions.PUSH_NOTIFICATION,
    payload: {
      notificationType: NotificationType.INFO,
      notificationText: <LoggedInAs username={result.username} />,
    },
  });
}

export function* CheckPasswordSagaMiddleware() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, CheckPasswordSaga);
}
