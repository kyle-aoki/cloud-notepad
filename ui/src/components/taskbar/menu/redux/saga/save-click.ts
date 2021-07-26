import { put, takeEvery } from 'redux-saga/effects';
import { FileSystem } from '../../../../file-system/redux';
import { Menu } from '../redux';

function* SaveClickSaga(): Generator<any, any, any> {
  const FileSystemController = new FileSystem.Instance(put);
  const MenuController = new Menu.Instance(put);

  yield FileSystemController.OPEN_FILE_SYSTEM(FileSystem.Mode.SAVE_NEW_FILE);
  yield FileSystemController.SAGA.GET_USER_DIR();
  yield MenuController.CLOSE_ALL();
}

export function* SaveClickSagaMiddlware() {
  yield takeEvery(Menu.SAGA.SAVE_CLICK.meta.type, SaveClickSaga);
}
