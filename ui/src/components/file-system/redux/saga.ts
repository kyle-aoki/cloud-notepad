import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../api/file.api';
import NotificationControl from '../../../notifications/redux/control';
import { FileSystemControl } from './control';
import { FileSystemActions } from './reducer';

function* GetUserDir(): Generator<any, any, any> {
  const NotificationController = new NotificationControl(put);
  const FileSystemControlller = new FileSystemControl(put);

  let getUserDirResult: any;
  try {
    getUserDirResult = yield call(FileAPI.GetUserDir);
  } catch (e) {
    return yield NotificationController.PUSH_ERROR('Network Error: Unable to get your directory.');
  }

  if (!getUserDirResult.data || !getUserDirResult.data.userDir) {
    return yield NotificationController.PUSH_ERROR('Unable to get your directory.');
  }

  yield FileSystemControlller.SET_USER_DIR(getUserDirResult.data.userDir);
}

export function* GetUserDirSaga() {
  yield takeEvery(FileSystemActions.GET_USER_DIR, GetUserDir);
}
