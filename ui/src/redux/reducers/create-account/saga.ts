import { call, put, takeEvery } from 'redux-saga/effects';
import { CreateAccountModalAction, CreateAccountModalActions } from './reducer';
import UserAPI from '../../../api/user-api';

function* createAccountGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  try {
    const result: any = yield call(
      UserAPI.createUser,
      action.payload.username,
      action.payload.password
    );
    console.log(result);
    yield put({ type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS });
  } catch (e) {
    yield put({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE });
  }
}

export function* createAccountSaga() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, createAccountGenerator);
}

function* checkUsernameGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  try {
    const result: any = yield call(UserAPI.checkUsername, action.payload.username);
    yield put({ type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS });
  } catch (e) {
    yield put({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE });
  }
}

export function* checkUsernameSage() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, checkUsernameGenerator);
}
