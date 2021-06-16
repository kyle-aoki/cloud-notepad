import { FileSystemState } from ".";
import { CLOSE_ALL, MenuActions } from "../menu";
import { store } from '../../../';

export const OPEN_FILE_SYSTEM = (state: FileSystemState) => {
  state.fileSystemOpen = true;
  return {...state};
}

export const CLOSE_FILE_SYETEM = (state: FileSystemState) => {
  state.fileSystemOpen = false;
  return {...state};
}
