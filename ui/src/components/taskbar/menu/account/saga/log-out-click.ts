import { put, takeEvery } from 'redux-saga/effects';
import { UNTITLED_FILE_TITLE } from '../../../../../constants';
import { Notif } from '../../../../../notif/redux';
import { ReduxAction } from '../../../../../redux/class';
import { Editor } from '../../../../editor/redux';
import { FileSystem } from '../../../../file-system/redux';
import { SaveModal } from '../../../../save-modal/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* LogOutSaga(action: ReduxAction): Generator<any, any, any> {
  const { fileSaveState } = action.payload;

  const AccountController = new Account.Instance(put);
  const MenuControl = new Menu.Instance(put);
  const NotifController = new Notif.Instance(put);
  const EditorController = new Editor.Instance(put);
  const SaveModalController = new SaveModal.Instance(put);
  const FileSystemController = new FileSystem.Instance(put);

  if (
    fileSaveState === FileSystem.FileSaveState.NEW_FILE_EDITED ||
    fileSaveState === FileSystem.FileSaveState.SAVED_FILE_EDITED
  ) {
    yield MenuControl.CLOSE_ALL();
    return yield SaveModalController.OPEN();
  }

  localStorage.clear();
  yield EditorController.UPDATE_EDITOR('');
  yield EditorController.SET_TITLE(UNTITLED_FILE_TITLE);
  yield AccountController.UNSET_USER();
  yield NotifController.PUSH_INFO("You've been logged out.");
  yield FileSystemController.SET_USER_DIR(null);
  yield MenuControl.CLOSE_ALL();
}

export function* LogOutSagaMiddleware() {
  yield takeEvery(Account.SAGA.LOG_OUT.meta.type, LogOutSaga);
}
