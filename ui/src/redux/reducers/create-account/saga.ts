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
    if (!result.ok) {
      switch (result.type) {
      }
    }
    yield put({ type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS });
  } catch (e) {
    yield put({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE });
  }
}

export function* createAccountSaga() {
  yield takeEvery(CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION, createAccountGenerator);
}

// click next button
function* checkUsernameGenerator(action: CreateAccountModalAction): Generator<any, any, any> {
  try {
    const result: any = yield call(UserAPI.checkUsername, action.payload.username);
    if (!result.ok) yield put({ type: CreateAccountModalActions.BAD_USERNAME });
    yield put({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });
  } catch (e) {
    yield put({ type: CreateAccountModalActions.BAD_USERNAME });
  }
}

export function* checkUsernameSaga() {
  yield takeEvery(CreateAccountModalActions.CHECK_USERNAME, checkUsernameGenerator);
}
