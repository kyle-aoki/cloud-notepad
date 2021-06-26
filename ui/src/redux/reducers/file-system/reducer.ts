import { Reducer } from 'redux';
import { CLOSE_FILE_SYSTEM, CREATE_FILE, DELETE_FILE, SET_USER_DIR, OPEN_FILE_SYSTEM, SAVE_FILE } from './functions';

export enum FileSystemSagaActions {
  GET_USER_DIR = 'GET_USER_DIR',
}

export enum FileSystemActions {
  FAILED_TO_GET_USER_DIR = 'FAILED_TO_GET_USER_DIR',

  OPEN_FILE_SYSTEM = 'OPEN_FILE_SYSTEM',
  CLOSE_FILE_SYSTEM = 'CLOSE_FILE_SYSTEM',
  SET_USER_DIR = 'SET_USER_DIR',
  CREATE_FILE = 'CREATE_FILE',
  SAVE_FILE = 'SAVE_FILE',
  DELETE_FILE = 'DELETE_FILE',
}

export interface FileSystemAction {
  type: FileSystemActions;
  payload?: {
    userDir: any;
  };
}

export interface FileSystemState {
  fileSystemOpen: boolean;
  userDir: any;
}

const initialState: FileSystemState = {
  fileSystemOpen: false,
  userDir: {},
};

export const fileSystemReducer: Reducer<FileSystemState, FileSystemAction> = (state = initialState, action) => {
  switch (action.type) {
    case FileSystemActions.CLOSE_FILE_SYSTEM:
      return CLOSE_FILE_SYSTEM(state, action);
    case FileSystemActions.OPEN_FILE_SYSTEM:
      return OPEN_FILE_SYSTEM(state, action);
    case FileSystemActions.SET_USER_DIR:
      return SET_USER_DIR(state, action);
    case FileSystemActions.CREATE_FILE:
      return CREATE_FILE(state, action);
    case FileSystemActions.SAVE_FILE:
      return SAVE_FILE(state, action);
    case FileSystemActions.DELETE_FILE:
      return DELETE_FILE(state, action);
    default:
      return state;
  }
};
