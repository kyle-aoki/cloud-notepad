import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../api/user-api';
import { LoggedInAs } from '../../../ui/username-font';
import { AccountAction, AccountActions, AccountSagaActions } from '../../taskbar/menu/account/redux/reducer';
import { AccountControl } from '../../taskbar/menu/account/redux/control';
import { LogInControl } from './control';
import NotificationControl from '../../../notifications/redux/control';

function* LogInSaga(action: AccountAction): Generator<any, any, any> {
  const AccountController = new AccountControl(put);
  const LogInController = new LogInControl(put);
  const NotificationController = new NotificationControl(put);

  yield LogInController.START_LOADING();

  const { username, password } = action.payload;

  let LogInResult;
  try {
    LogInResult = yield call(UserAPI.LogIn, username, password);
  } catch (e) {
    yield put({ type: AccountActions.INVALID_LOG_IN });
  }

  if (LogInResult.ok) {
    yield AccountController.SET_USER(username);
    yield LogInController.TOGGLE_LOG_IN_MODAL();
    yield NotificationController.PUSH_INFO(<LoggedInAs username={username} />);
    yield LogInController.STOP_LOADING();
    return;
  }

  yield NotificationController.PUSH_ERROR('Incorrect username or password.');
  yield LogInController.STOP_LOADING();
}

export function* LogInSagaMiddleware() {
  yield takeEvery(AccountSagaActions.SUBMIT_LOG_IN, LogInSaga);
}
