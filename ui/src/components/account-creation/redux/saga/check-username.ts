import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../../api/user-api';
import { NotificationType } from '../../../../notifications/redux/reducer';
import { CreateAccountModalAction, CreateAccountModalActions } from '../reducer';
import { CheckUsernameResponse } from '@cloud-notepad/cloud-notepad-response';
import NotificationControl from '../../../../notifications/redux/control';
import { AccountCreationControl } from '../control';

// Click 'Next' button.
function* CheckUsernameSaga(action: CreateAccountModalAction): Generator<any, any, any> {
  const NotificationController = new NotificationControl(put);
  const AccountCreationController = new AccountCreationControl(put);

  if (action.payload.usernameLoading) return;

  yield AccountCreationController.USERNAME_LOADING();

  if (!action.payload.username) return yield put({ type: CreateAccountModalActions.BAD_USERNAME });

  let checkUsernameResult;
  try {
    checkUsernameResult = yield call(UserAPI.checkUsername, action.payload.username);
  } catch (e) {
    return yield NotificationController.NETWORK_ERROR();
  }

  if (checkUsernameResult.ok) return yield put({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });

  if (checkUsernameResult.type === CheckUsernameResponse.USER_EXISTS) {
    yield AccountCreationController.STOP_USERNAME_LOADING();
    yield NotificationController.PUSH_ERROR('That username is taken. Try another.');
    return;
  }
  return yield NotificationController.GENERIC_ERROR();
}

export function* CheckUsernameSagaMiddleware() {
  yield takeEvery(CreateAccountModalActions.CHECK_USERNAME, CheckUsernameSaga);
}
