import { put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../REDUX';

// Cutoff for number of milliseconds between clicks to trigger a double click. Under --> DOUBLE, Above --> SINGLE.
const DOUBLE_CLICK_TIME_DELTA_THRESHOLD = 350 as const;

// Determines whether to trigger a single click or a double click.
function* HandleFolderClickSaga(action: ReduxAction) {
  const FileSystemController = new FileSystem.Instance(put);

  const { lastClickTime, folderName } = action.payload;
  const timeDelta = Date.now() - lastClickTime;

  if (timeDelta < DOUBLE_CLICK_TIME_DELTA_THRESHOLD) {
    yield FileSystemController.FOLDER_CLICKED(folderName);
  } else {
    yield FileSystemController.SELECT_OBJECT(folderName);
  }

  yield FileSystemController.SET_NEW_LAST_CLICK_TIME(Date.now());
}

export function* HandleFolderClickSagaMiddleware() {
  yield takeEvery(FileSystem.SAGA.HANDLE_FOLDER_CLICK.meta.type, HandleFolderClickSaga);
}
