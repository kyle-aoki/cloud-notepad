import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { Executor } from '../../../redux/class';
import { FileSystemActions, FileSystemState } from './reducer';

export const useFileSystemState = () => useSelector((state: GlobalState) => state.fileSystem);

export class FileSystemControl extends Executor {
  OPEN_FILE_SYSTEM = () => this.exec({ type: FileSystemActions.OPEN_FILE_SYSTEM });
  CLOSE_FILE_SYSTEM = () => this.exec({ type: FileSystemActions.CLOSE_FILE_SYSTEM });
  CREATE_FILE = () => this.exec({ type: FileSystemActions.CREATE_FILE });
  SAVE_FILE = () => this.exec({ type: FileSystemActions.SAVE_FILE });
  DELETE_FILE = () => this.exec({ type: FileSystemActions.DELETE_FILE });
  GET_USER_DIR = () => this.exec({ type: FileSystemActions.GET_USER_DIR });
  BACK_BUTTON_PRESSED = () => this.exec({ type: FileSystemActions.BACK_BUTTON_PRESSED });
  FORWARD_BUTTON_PRESSED = () => this.exec({ type: FileSystemActions.FORWARD_BUTTON_PRESSED });

  SET_USER_DIR = (userDir: any) => this.exec({ type: FileSystemActions.SET_USER_DIR, payload: { userDir } });
  FOLDER_CLICKED = (folderPath: any) => this.exec({ type: FileSystemActions.FOLDER_CLICKED, payload: { folderPath } });
}
