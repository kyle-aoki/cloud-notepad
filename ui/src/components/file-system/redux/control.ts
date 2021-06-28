import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { FileSystemActions, FileSystemSagaActions, FileSystemState } from './reducer';

export function useFileSystemState() {
  const state = useSelector((state: GlobalState) => state.fileSystem);
  return state;
}

export function useFileSystemControl() {
  const dispatch = useDispatch();
  return new FileSystemControl(dispatch);
}

class FileSystemControl {
  dispatch: Dispatch<any>;

  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  OPEN_FILE_SYSTEM() {
    this.dispatch({ type: FileSystemActions.OPEN_FILE_SYSTEM });
  }

  CLOSE_FILE_SYSTEM() {
    this.dispatch({ type: FileSystemActions.CLOSE_FILE_SYSTEM });
  }

  CREATE_FILE() {
    this.dispatch({ type: FileSystemActions.CREATE_FILE });
  }
  SAVE_FILE() {
    this.dispatch({ type: FileSystemActions.SAVE_FILE });
  }
  DELETE_FILE() {
    this.dispatch({ type: FileSystemActions.DELETE_FILE });
  }

  GET_USER_DIR() {
    this.dispatch({ type: FileSystemSagaActions.GET_USER_DIR });
  }
}
