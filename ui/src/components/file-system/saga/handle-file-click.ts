import { put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../redux';

// Cutoff for number of milliseconds between clicks to trigger a double click. Under --> DOUBLE, Above --> SINGLE.
const DOUBLE_CLICK_TIME_DELTA_THRESHOLD = 350 as const;

// Determines whether to trigger a single click or a double click.
function* HandleFileClick(action: ReduxAction) {

}

export function* HandleFileClickMiddleware() {
  yield takeEvery(FileSystem.SAGA.HANDLE_FOLDER_CLICK.meta.type, HandleFileClick);
}
