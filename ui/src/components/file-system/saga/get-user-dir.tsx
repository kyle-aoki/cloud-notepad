import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../api/file.api';
import { Notif } from '../../../notif/redux';
import { FileSystem } from '../redux';
import { UserDir } from '../user-dir';

export function* GetUserDir(): Generator<any, any, any> {
  const NotifController = new Notif.Instance(put);
  const FileSystemController = new FileSystem.Instance(put);

  let getUserDirResult: any;
  try {
    getUserDirResult = yield call(FileAPI.GetUserDir);
  } catch (e) {
    return yield NotifController.PUSH_ERROR('Network Error: Unable to get your directory.');
  }

  if (!getUserDirResult.data || !getUserDirResult.data.userDir) {
    return yield NotifController.PUSH_ERROR('Unable to get your directory.');
  }

  const userDir = getUserDirResult.data.userDir;

  let memory = userDir.reduce((acc: number, val: any) => {
    return acc + val.fileSize;
  }, 0);

  yield FileSystemController.SET_TOTAL_MEMORY(memory);
  yield FileSystemController.SET_USER_DIR(<UserDir userDir={userDir} />);
}

export function* GetUserDirSaga() {
  yield takeEvery(FileSystem.SAGA.GET_USER_DIR.meta.type, GetUserDir);
}
