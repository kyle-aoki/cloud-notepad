import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../api/file.api';
import { FileSystemAction, FileSystemActions, FileSystemSagaActions } from './reducer';

function* GetUserDir(action: FileSystemAction): Generator<any, any, any> {
  try {
    const getUserDirResult: any = yield call(FileAPI.GetUserDir);

    if (!getUserDirResult.data || !getUserDirResult.data.userDir) {
      return yield put({ type: FileSystemActions.FAILED_TO_GET_USER_DIR });
    }

    yield put({ type: FileSystemActions.SET_USER_DIR, payload: { userDir: getUserDirResult.data.userDir } });
  } catch (e) {
    yield put({ type: FileSystemActions.FAILED_TO_GET_USER_DIR });
  }
}

export function* GetUserDirSaga() {
  yield takeEvery(FileSystemSagaActions.GET_USER_DIR, GetUserDir);
}
