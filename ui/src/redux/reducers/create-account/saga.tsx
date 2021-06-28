import { call, put, takeEvery } from 'redux-saga/effects';
import { CreateAccountModalAction, CreateAccountModalActions } from './reducer';
import UserAPI from '../../../api/user-api';
import { GenericError } from '../../../shared';
import { NotificationActions, NotificationType } from '../notifications/reducer';
import { LoggedInAs, UsernameDisplay } from '../../../ui/username-font';

// click 'Next' button
function* checkUsernameGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  try {
    if (!action.payload.username) {
      return yield put({ type: CreateAccountModalActions.BAD_USERNAME });
    }
    const checkUsernameResult: any = yield call(UserAPI.checkUsername, action.payload.username);
    if (!checkUsernameResult.ok) {
      return yield put({
        type: CreateAccountModalActions.BAD_USERNAME,
        payload: { ...checkUsernameResult },
      });
    }

    yield put({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });
  } catch (e) {
    yield put({
      type: CreateAccountModalActions.BAD_USERNAME,
      payload: {
        type: GenericError.NETWORK_ERROR,
      },
    });
  }
}

export function* checkUsernameSaga() {
  yield takeEvery(CreateAccountModalActions.CHECK_USERNAME, checkUsernameGenerator);
}

// Click 'Create Account' Button
function* createAccountGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  try {
    const result: any = yield call(UserAPI.createUser, action.payload.username, action.payload.password);
    if (!result.ok) {
      return yield put({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE, payload: { ...result } });
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
  } catch (e) {
    yield put({
      type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE,
      payload: { type: GenericError.NETWORK_ERROR },
    });
  }
}

export function* createAccountSaga() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, createAccountGenerator);
}
