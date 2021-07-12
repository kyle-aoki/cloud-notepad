import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../api/user-api';
import { LoggedInAs } from '../../../ui/username-font';
import { ValidationResponse } from '@cloud-notepad/cloud-notepad-response';
import { Notif } from '../../../notif/redux';
import { AccountCreation } from '../redux';
import { ReduxAction } from '../../../redux/class';
import { Account } from '../../taskbar/menu/account/redux';

// Click 'Create Account' Button
function* CheckPasswordSaga(action: ReduxAction): Generator<any, any, any> {
  const NotifController = new Notif.Instance(put);
  const AccountCreationController = new AccountCreation.Instance(put);
  const AccountController = new Account.Instance(put);

  if (action.payload.passwordLoading) return;

  yield AccountCreationController.PASSWORD_LOADING();
  const { username, password } = action.payload;

  let CheckPasswordResult;
  try {
    CheckPasswordResult = yield call(UserAPI.checkPassword, password);
  } catch (e) {
    yield NotifController.NETWORK_ERROR();
  }

  if (!CheckPasswordResult.ok) {
    switch (CheckPasswordResult.type) {
      case ValidationResponse.INVALID_PASSWORD_SYMBOLS:
        yield NotifController.PUSH_ERROR(`Invalid symbols in password. The symbols \\, ", and / are not permitted.`); break;
      case ValidationResponse.PASSWORD_SHORT:
        yield NotifController.PUSH_ERROR('Password is too short.'); break;
      case ValidationResponse.PASSWORD_LONG:
        yield NotifController.PUSH_ERROR('Password is too long.'); break;
      default:
        yield NotifController.GENERIC_ERROR();
    }
    yield AccountCreationController.STOP_PASSWORD_LOADING();
    return;
  }

  let result;
  try {
    result = yield call(UserAPI.createUser, username, password);
  } catch (e) {
    yield NotifController.NETWORK_ERROR();
  }

  if (result.ok) {
    yield AccountCreationController.STOP_PASSWORD_LOADING();
    yield NotifController.PUSH_INFO(<LoggedInAs username={username} />);
    yield AccountCreationController.CLOSE_MODAL();
    yield AccountController.SET_USER(username);
    return;
  }

  yield NotifController.GENERIC_ERROR();
  yield AccountCreationController.STOP_PASSWORD_LOADING();
}

export function* CheckPasswordSagaMiddleware() {
  yield takeEvery(AccountCreation.SAGA.CHECK_PASSWORD.meta.type, CheckPasswordSaga);
}
