import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../api/file.api';
import UserAPI from '../../../api/user-api';
import { AccountAction, AccountActions, AccountSagaActions } from './reducer';

function* LogIn(action: AccountAction): Generator<any, any, any> {
  try {
    const LogInResult: any = yield call(UserAPI.LogIn, action.payload.username, action.payload.password);
    if (!LogInResult.ok) {
      return yield put({ type: AccountActions.INVALID_LOG_IN });
    }
    yield put({ type: AccountActions.SET_USER, payload: { username: action.payload.username } });
  } catch (e) {
    yield put({ type: AccountActions.INVALID_LOG_IN });
  }
}

export function* LogInSaga() {
  yield takeEvery(AccountSagaActions.LOG_IN, LogIn);
}
