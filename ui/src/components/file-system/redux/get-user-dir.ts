import { call, put, takeEvery } from 'redux-saga/effects';
import { FileSystem } from '.';
import FileAPI from '../../../api/file.api';
import { Notif } from '../../../notif/redux';

function* GetUserDir(): Generator<any, any, any> {
  const NotifController = new Notif.Instance(put);
  const FileSystemControlller = new FileSystem.Instance(put);

  let getUserDirResult: any;
  try {
    getUserDirResult = yield call(FileAPI.GetUserDir);
  } catch (e) {
    return yield NotifController.PUSH_ERROR('Network Error: Unable to get your directory.');
  }

  if (!getUserDirResult.data || !getUserDirResult.data.userDir) {
    return yield NotifController.PUSH_ERROR('Unable to get your directory.');
  }

  yield FileSystemControlller.SET_USER_DIR(getUserDirResult.data.userDir);
}

export function* GetUserDirSaga() {
  yield takeEvery(FileSystem.SAGA.GET_USER_DIR.meta.type, GetUserDir);
}
