import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../../api/user-api';
import { NotificationActions, NotificationType } from '../../../../notifications/redux/reducer';
import { CreateAccountModalAction, CreateAccountModalActions } from '../reducer';
import { CheckUsernameResponse } from '@cloud-notepad/cloud-notepad-response';
import { NotificationActionCreator } from '../../../../notifications/redux/control';
import { AccountCreationActionCreator } from '../control';

// click 'Next' button
function* checkUsernameGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  if (!action.payload.username) return yield put({ type: CreateAccountModalActions.BAD_USERNAME });

  let checkUsernameResult;
  try {
    checkUsernameResult = yield call(UserAPI.checkUsername, action.payload.username);
  } catch (e) {
    yield put(NotificationActionCreator.NETWORK_ERROR());
  }

  if (!checkUsernameResult.ok) {
    if (checkUsernameResult.type === CheckUsernameResponse.USER_EXISTS) {
      yield put(AccountCreationActionCreator.STOP_USERNAME_LOADING());
      return yield put(
        NotificationActionCreator.PUSH_NOTIFICATION('That username is taken. Try another.', NotificationType.ERROR)
      );
    }
    return yield put(NotificationActionCreator.GENERIC_ERROR());
  }

  yield put({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });
}

export function* checkUsernameSaga() {
  yield takeEvery(CreateAccountModalActions.CHECK_USERNAME, checkUsernameGenerator);
}
