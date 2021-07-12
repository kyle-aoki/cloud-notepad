import { call, put, takeEvery } from 'redux-saga/effects';
import UserAPI from '../../../api/user-api';
import { CheckUsernameResponse, ValidationResponse } from '@cloud-notepad/cloud-notepad-response';
import { Notif } from '../../../notif/redux';
import { AccountCreation } from '../redux';
import { ReduxAction } from '../../../redux/class';

// Click 'Next' button.
function* CheckUsernameSaga(action: ReduxAction): Generator<any, any, any> {
  if (!action.payload.username || action.payload.usernameLoading) return;

  const NotifController = new Notif.Instance(put);
  const AccountCreationController = new AccountCreation.Instance(put);

  yield AccountCreationController.USERNAME_LOADING();

  let checkUsernameResult;
  try {
    checkUsernameResult = yield call(UserAPI.checkUsername, action.payload.username);
  } catch (e) {
    return yield NotifController.NETWORK_ERROR();
  }

  if (checkUsernameResult.ok) {
    yield AccountCreationController.STOP_USERNAME_LOADING();
    yield AccountCreationController.GO_TO_PASSWORD_SCREEN();
    return;
  }

  // prettier-ignore
  switch (checkUsernameResult.type) {
    case CheckUsernameResponse.USER_EXISTS: 
      yield NotifController.PUSH_ERROR('That username is taken. Try another.'); break;
    case ValidationResponse.INVALID_USERNAME_SYMBOLS: 
      yield NotifController.PUSH_ERROR('Invalid symbols in username. Can only use - and _ in username.'); break;
    case ValidationResponse.USERNAME_SHORT: 
      yield NotifController.PUSH_ERROR('That username is too short.'); break;
    case ValidationResponse.USERNAME_LONG: 
      yield NotifController.PUSH_ERROR('That username is too long.'); break;
    default: 
      yield NotifController.GENERIC_ERROR();
  }
  yield AccountCreationController.STOP_USERNAME_LOADING();
}

export function* CheckUsernameSagaMiddleware() {
  yield takeEvery(AccountCreation.SAGA.CHECK_USERNAME.meta.type, CheckUsernameSaga);
}
