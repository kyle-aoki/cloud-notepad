import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { Executor } from '../../../redux/class';
import { FileSystemActions, FileSystemState } from './reducer';

export const useFileSystemState = () => useSelector((state: GlobalState) => state.fileSystem);

export class FileSystemControl extends Executor {
  OPEN_FILE_SYSTEM() {
    return this.exec({ type: FileSystemActions.OPEN_FILE_SYSTEM });
  }

  CLOSE_FILE_SYSTEM() {
    return this.exec({ type: FileSystemActions.CLOSE_FILE_SYSTEM });
  }

  CREATE_FILE() {
    return this.exec({ type: FileSystemActions.CREATE_FILE });
  }

  SAVE_FILE() {
    return this.exec({ type: FileSystemActions.SAVE_FILE });
  }

  DELETE_FILE() {
    return this.exec({ type: FileSystemActions.DELETE_FILE });
  }

  GET_USER_DIR() {
    return this.exec({ type: FileSystemActions.GET_USER_DIR });
  }

  SET_USER_DIR(userDir: any) {
    return this.exec({ type: FileSystemActions.SET_USER_DIR, payload: { userDir } });
  }

  BACK_BUTTON_PRESSED() {
    return this.exec({ type: FileSystemActions.BACK_BUTTON_PRESSED });
  }

  FORWARD_BUTTON_PRESSED() {
    return this.exec({ type: FileSystemActions.FORWARD_BUTTON_PRESSED });
  }

  FOLDER_DOUBLE_CLICKED(folderPath: any) {
    return this.exec({ type: FileSystemActions.FOLDER_DOUBLE_CLICKED, payload: { folderPath } });
  }
}
