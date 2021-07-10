import { Reducer } from 'redux';
import {
  CLOSE_FILE_SYSTEM,
  CREATE_FILE,
  DELETE_FILE,
  SET_USER_DIR,
  OPEN_FILE_SYSTEM,
  SAVE_FILE,
  BACK_BUTTON_PRESSED,
  FORWARD_BUTTON_PRESSED,
  FOLDER_CLICKED,
} from './functions';

export enum FileSystemActions {
  GET_USER_DIR = 'GET_USER_DIR',
  OPEN_FILE_SYSTEM = 'OPEN_FILE_SYSTEM',
  CLOSE_FILE_SYSTEM = 'CLOSE_FILE_SYSTEM',
  SET_USER_DIR = 'SET_USER_DIR',
  CREATE_FILE = 'CREATE_FILE',
  SAVE_FILE = 'SAVE_FILE',
  DELETE_FILE = 'DELETE_FILE',

  BACK_BUTTON_PRESSED = 'BACK_BUTTON_PRESSED',
  FORWARD_BUTTON_PRESSED = 'FORWARD_BUTTON_PRESSED',

  FOLDER_CLICKED = 'FOLDER_CLICKED',
}

export interface FileSystemAction {
  type: FileSystemActions;
  payload?: any;
}

export interface FileSystemState {
  fileSystemOpen: boolean;
  userDir: any;
  path: string[];
  recent: string[];
}

const initialState: FileSystemState = {
  fileSystemOpen: false,
  userDir: undefined,
  path: [],
  recent: [],
};

// prettier-ignore
export const fileSystemReducer: Reducer<FileSystemState, FileSystemAction> = (state = initialState, action) => {
  switch (action.type) {
    case FileSystemActions.CLOSE_FILE_SYSTEM:       return CLOSE_FILE_SYSTEM(state, action);
    case FileSystemActions.OPEN_FILE_SYSTEM:        return OPEN_FILE_SYSTEM(state, action);
    case FileSystemActions.SET_USER_DIR:            return SET_USER_DIR(state, action);
    case FileSystemActions.CREATE_FILE:             return CREATE_FILE(state, action);
    case FileSystemActions.SAVE_FILE:               return SAVE_FILE(state, action);
    case FileSystemActions.DELETE_FILE:             return DELETE_FILE(state, action);
    case FileSystemActions.BACK_BUTTON_PRESSED:     return BACK_BUTTON_PRESSED(state, action);
    case FileSystemActions.FORWARD_BUTTON_PRESSED:  return FORWARD_BUTTON_PRESSED(state, action);
    case FileSystemActions.FOLDER_CLICKED:          return FOLDER_CLICKED(state, action);
    default: return state;
  }
};
