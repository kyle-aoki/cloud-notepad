import { put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../../file-system/redux';
import { Editor } from '../redux';
import { addEditorUnsavedStar } from '../util';

function* HandleEditorChangeSaga(action: ReduxAction): Generator<any, any, any> {
  const EditorController = new Editor.Instance(put);
  const FileSystemController = new FileSystem.Instance(put);

  const { newEditorValue, fileSaveState } = action.payload;
  yield EditorController.UPDATE_EDITOR(newEditorValue);

  switch (fileSaveState) {
    case FileSystem.FileSaveState.NEW_FILE_PURE:
      yield FileSystemController.SET_FILE_SAVE_STATE(FileSystem.FileSaveState.NEW_FILE_EDITED);
      yield EditorController.ADD_STAR();
      addEditorUnsavedStar();
      break;
    case FileSystem.FileSaveState.SAVED_FILE_PURE:
      yield FileSystemController.SET_FILE_SAVE_STATE(FileSystem.FileSaveState.SAVED_FILE_EDITED);
      yield EditorController.ADD_STAR();
      addEditorUnsavedStar();
      break;
  }
}

export function* HandleEditorChangeSagaMiddlware() {
  yield takeEvery(Editor.SAGA.HANDLE_EDITOR_CHANGE.meta.type, HandleEditorChangeSaga);
}
