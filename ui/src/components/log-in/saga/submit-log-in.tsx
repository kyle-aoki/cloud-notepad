import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../api/user-api';
import { Notif } from '../../../notif/redux';
import { ReduxAction } from '../../../redux/class';
import { LoggedInAs } from '../../../ui/username-font';
import AccountComponent from '../../taskbar/menu/account';
import { LogIn } from '../redux';

function* LogInSaga(action: ReduxAction): Generator<any, any, any> {
  const { loading, username, password } = action.payload;
  if (loading) return;

  const AccountController = new AccountComponent.Instance(put);
  const LogInController = new LogIn.Instance(put);
  const NotifController = new Notif.Instance(put);

  yield LogInController.START_LOADING();

  let LogInResult;
  try {
    LogInResult = yield call(UserAPI.LogIn, username, password);
  } catch (e) {
    yield NotifController.NETWORK_ERROR();
  }

  if (LogInResult.ok) {
    yield AccountController.SET_USER(username);
    yield LogInController.TOGGLE_LOG_IN_MODAL();
    yield NotifController.PUSH_INFO(<LoggedInAs username={username} />);
    yield LogInController.STOP_LOADING();
    return;
  }

  yield NotifController.PUSH_ERROR('Incorrect username or password.');
  yield LogInController.STOP_LOADING();
}

export function* LogInSagaMiddleware() {
  yield takeEvery(LogIn.SAGA.SUBMIT_LOG_IN.meta.type, LogInSaga);
}
