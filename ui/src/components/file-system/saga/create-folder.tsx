import { call, put, takeEvery } from 'redux-saga/effects';
import { ReduxAction } from '../../../redux/class';
import { FileSystem } from '../redux';
import { Editor } from '../../editor/redux';
import FileAPI from '../../../api/file.api';
import { Notif } from '../../../notif/redux'
import { DS_STORE, DS_STORE_CONTENTS } from '../../../constants/index';
import { GetUserDirSaga } from './get-user-dir';
import { UserDir } from '../user-dir';

const DS_StoreRequestObject = (filePath: string[]) =>  ({
  fileName: DS_STORE,
  filePath,
  fileContent: DS_STORE_CONTENTS,
});

function* CreateFolderSaga(action: ReduxAction): Generator<any, any, any> {
  const FileSystemController = new FileSystem.Instance(put);
  const NotifController = new Notif.Instance(put);

  yield FileSystemController.STOP_FOLDER_CREATION_PROCESS();
  yield FileSystemController.START_NEW_FOLDER_LOADING();

  const { path, newFolderName } = action.payload;

  const newPath = [...path, newFolderName]

  let CreateDSStoreFileResult;
  try {
    CreateDSStoreFileResult = yield call(FileAPI.CreateFile, DS_StoreRequestObject(newPath));
  } catch (e) {
    yield NotifController.NETWORK_ERROR();
  }

  if (CreateDSStoreFileResult.ok) {
    const newUserDir = CreateDSStoreFileResult.data.newUserDir;
    yield FileSystemController.SET_USER_DIR(<UserDir userDir={newUserDir} />);
    
    yield NotifController.PUSH_INFO('Folder created.')

  } else {

    yield NotifController.GENERIC_ERROR();
  }
  
  yield FileSystemController.STOP_NEW_FOLDER_LOADING();
}

export function* CreateFolderSagaMiddleware() {
  yield takeEvery(FileSystem.SAGA.CREATE_FOLDER.meta.type, CreateFolderSaga);
}
