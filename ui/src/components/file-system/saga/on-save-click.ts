import { call, put, takeEvery } from 'redux-saga/effects';
import FileAPI from '../../../api/file.api';
import { Notif } from '../../../notif/redux';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../redux';
import { FileResponse } from '@cloud-notepad/cloud-notepad-response';
import { GetUserDir } from './get-user-dir';

function* OnSaveClickSaga(action: ReduxAction): Generator<any, any, any> {
  const NotifController = new Notif.Instance(put);
  const FileSystemController = new FileSystem.Instance(put);

  yield FileSystemController.START_LOADING();

  let { path, newFileName, newFileExtension, fileContent } = action.payload;

  fileContent = fileContent === undefined ? "" : fileContent;

  if (!newFileName) {
    yield NotifController.PUSH_ERROR('Missing file name.');
    yield FileSystemController.STOP_LOADING();
    return;
  }
  if (!newFileExtension) {
    yield NotifController.PUSH_ERROR('Missing file extension.');
    yield FileSystemController.STOP_LOADING();
    return;
  }

  const firstCharacterIsPeriod = newFileExtension[0] === '.';
  if (!firstCharacterIsPeriod) newFileExtension = '.' + newFileExtension;

  const fullNewFileName = newFileName + newFileExtension;

  let CreateFileResult;
  try {
    CreateFileResult = yield call(FileAPI.CreateFile, {
      fileName: fullNewFileName,
      filePath: path,
      fileContent: fileContent,
    });
  } catch (e) {
    return yield NotifController.NETWORK_ERROR()
  }

  if (CreateFileResult.ok) {
    yield GetUserDir();
    yield NotifController.PUSH_INFO('File saved.');
    
  } else {
    if (CreateFileResult.type === FileResponse.FILE_ALREADY_EXISTS) {
      yield NotifController.PUSH_ERROR('That file name already exists.');
    }
  }

  yield FileSystemController.STOP_LOADING();
}

export function* OnSaveClickSagaMiddlware() {
  yield takeEvery(FileSystem.SAGA.SAVE_NEW_FILE.meta.type, OnSaveClickSaga);
}