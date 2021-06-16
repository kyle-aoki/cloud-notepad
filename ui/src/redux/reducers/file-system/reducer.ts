import { Reducer } from 'redux';
import { CLOSE_FILE_SYETEM, FileSystemAction, FileSystemActions, OPEN_FILE_SYSTEM } from '.';

export interface FileSystemState {
  fileSystemOpen: boolean;
}

const initialState: FileSystemState = {
  fileSystemOpen: false,
};

export const fileSystemReducer: Reducer<FileSystemState, FileSystemAction> = (state = initialState, action) => {
  switch (action.type) {
    case FileSystemActions.CLOSE_FILE_SYSTEM: return CLOSE_FILE_SYETEM(state);
    case FileSystemActions.OPEN_FILE_SYSTEM: return OPEN_FILE_SYSTEM(state);
    default: return state;
  }
};
