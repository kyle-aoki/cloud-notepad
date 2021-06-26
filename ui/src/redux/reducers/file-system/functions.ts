import { FileSystemAction, FileSystemState } from './reducer';

export const OPEN_FILE_SYSTEM = (state: FileSystemState, action: FileSystemAction) => {
  state.fileSystemOpen = true;
  return { ...state };
};

export const CLOSE_FILE_SYSTEM = (state: FileSystemState, action: FileSystemAction) => {
  state.fileSystemOpen = false;
  return { ...state };
};

export function SET_USER_DIR(state: FileSystemState, action: FileSystemAction) {
  if (!action.payload) return { ...state };

  state.userDir = action.payload.userDir;
  return { ...state };
}

export function CREATE_FILE(state: FileSystemState, action: FileSystemAction) {
  return { ...state };
}

export function SAVE_FILE(state: FileSystemState, action: FileSystemAction) {
  return { ...state };
}

export function DELETE_FILE(state: FileSystemState, action: FileSystemAction) {
  return { ...state };
}
