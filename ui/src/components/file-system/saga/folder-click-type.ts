import { put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../redux';

// Number of milliseconds between clicks to trigger a double click. Under --> DOUBLE, Above --> SINGLE.
const DOUBLE_CLICK_TIME_DELTA = 350 as const;

// Determines whether to trigger a single click or a double click.
function* ClickDoubleClickSaga(action: ReduxAction) {
  const FileSystemController = new FileSystem.Instance(put);

  const { lastClickTime, folderName } = action.payload;

  const currentClick = Date.now();
  const timeDiff = currentClick - lastClickTime;

  if (timeDiff < DOUBLE_CLICK_TIME_DELTA) {
    yield FileSystemController.FOLDER_CLICKED(folderName);
  } else {
    yield FileSystemController.SELECT(folderName);
  }

  yield FileSystemController.SET_NEW_LAST_CLICK_TIME(Date.now());
}

export function* ClickDoubleClickSagaMiddleware() {
  yield takeEvery(FileSystem.SAGA.CLICK_DOUBLE_CLICK.meta.type, ClickDoubleClickSaga);
}
