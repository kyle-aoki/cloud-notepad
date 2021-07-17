import { call, put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../redux';
import { Editor } from '../../editor/redux';
import FileAPI from '../../../api/file.api';
import { Notif } from '../../../notif/redux'

// Cutoff for number of milliseconds between clicks to trigger a double click. Under --> DOUBLE, Above --> SINGLE.
const DOUBLE_CLICK_TIME_DELTA_THRESHOLD = 350 as const;

// Determines whether to trigger a single click or a double click.
function* HandleFileClickSaga(action: ReduxAction): Generator<any, any, any> {
  
  const NotifController = new Notif.Instance(put);
  const FileSystemController = new FileSystem.Instance(put);
  const EditorController = new Editor.Instance(put);

  const { lastClickTime, fileName, filePath } = action.payload;
  const timeDelta = Date.now() - lastClickTime;

  if (timeDelta < DOUBLE_CLICK_TIME_DELTA_THRESHOLD) {
    try {
      let LoadFileResult = yield call(FileAPI.GetFile, fileName, filePath);
      if (LoadFileResult.ok) {
        yield EditorController.LOAD_FILE(LoadFileResult.data.fileContent);
        yield FileSystemController.CLOSE_FILE_SYSTEM();
        return;
      }
      alert(JSON.stringify(LoadFileResult));

    } catch (e) {
      alert(e);
      yield NotifController.NETWORK_ERROR();
    }
  } else {
    yield FileSystemController.SELECT_OBJECT(fileName);
  }

  yield FileSystemController.SET_NEW_LAST_CLICK_TIME(Date.now());
}

export function* HandleFileClickSagaMiddleware() {
  yield takeEvery(FileSystem.SAGA.HANDLE_FILE_CLICK.meta.type, HandleFileClickSaga);
}
