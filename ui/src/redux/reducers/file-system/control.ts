import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { FileSystemActions, FileSystemState } from './reducer';

export function useFileSystemControl() {
  const state = useSelector((state: GlobalState) => state.fileSystem);
  const dispatch = useDispatch();
  return new FileSystemControl(state, dispatch);
}

class FileSystemControl {
  state: FileSystemState;
  dispatch: Dispatch<any>;

  constructor(state: FileSystemState, dispatch: Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  OPEN_FILE_SYSTEM() {
    this.dispatch({ type: FileSystemActions.OPEN_FILE_SYSTEM });
  }

  CLOSE_FILE_SYSTEM() {
    this.dispatch({ type: FileSystemActions.CLOSE_FILE_SYSTEM });
  }
}
