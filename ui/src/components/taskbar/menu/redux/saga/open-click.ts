import { put, takeEvery } from 'redux-saga/effects';
import { FileSystem } from '../../../../file-system/redux';
import { Menu } from '../redux';

function* OpenClickSaga(): Generator<any, any, any> {
  const FileSystemController = new FileSystem.Instance(put);
  const MenuController = new Menu.Instance(put);

  yield FileSystemController.OPEN_FILE_SYSTEM(FileSystem.Mode.OPEN_FILE);
  yield FileSystemController.SAGA.GET_USER_DIR();
  yield MenuController.CLOSE_ALL();
}

export function* OpenClickSagaMiddlware() {
  yield takeEvery(Menu.SAGA.OPEN_CLICK.meta.type, OpenClickSaga);
}
