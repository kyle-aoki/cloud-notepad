import { FileSystemState } from './reducer';

export const OPEN_FILE_SYSTEM = (state: FileSystemState) => {
  state.fileSystemOpen = true;
  return { ...state };
};

export const CLOSE_FILE_SYSTEM = (state: FileSystemState) => {
  state.fileSystemOpen = false;
  return { ...state };
};
