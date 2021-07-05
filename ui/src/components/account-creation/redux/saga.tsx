import { call, put, takeEvery } from 'redux-saga/effects';
import { CreateAccountModalAction, CreateAccountModalActions } from './reducer';
import UserAPI from '../../../api/user-api';
import { NotificationActions, NotificationType } from '../../../notifications/redux/reducer';
import { LoggedInAs, UsernameDisplay } from '../../../ui/username-font';
import { GenericError } from '@cloud-notepad/cloud-notepad-response';

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
