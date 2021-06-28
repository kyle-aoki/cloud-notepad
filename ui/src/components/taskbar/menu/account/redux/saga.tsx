import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../../../api/file.api';
import UserAPI from '../../../../../api/user-api';
import { LoggedInAs } from '../../../../../ui/username-font';
import { LogInActions } from '../../../../log-in/redux/reducer';
import { NotificationActions, NotificationType } from '../../../../../notifications/redux/reducer';
import { AccountAction, AccountActions, AccountSagaActions } from './reducer';

function* LogIn(action: AccountAction): Generator<any, any, any> {
  try {
    const LogInResult: any = yield call(UserAPI.LogIn, action.payload.username, action.payload.password);
    if (!LogInResult.ok) {
      yield put({
        type: NotificationActions.PUSH_NOTIFICATION,
        payload: { notificationType: NotificationType.ERROR, notificationText: 'Incorrect username or password.' },
      });
      yield put({ type: AccountActions.INVALID_LOG_IN });
    } else {
      yield put({ type: AccountActions.SET_USER, payload: { username: action.payload.username } });
      yield put({ type: LogInActions.TOGGLE_LOG_IN_MODAL });
      yield put({
        type: NotificationActions.PUSH_NOTIFICATION,
        payload: {
          notificationType: NotificationType.INFO,
          notificationText: <LoggedInAs username={LogInResult.username} />,
        },
      });
    }

    yield put({ type: LogInActions.STOP_LOADING });
  } catch (e) {
    yield put({ type: AccountActions.INVALID_LOG_IN });
  }
}

export function* LogInSaga() {
  yield takeEvery(AccountSagaActions.SUBMIT_LOG_IN, LogIn);
}
