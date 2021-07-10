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

export function BACK_BUTTON_PRESSED(state: FileSystemState, action: FileSystemAction) {
  if (state.path.length === 0) return { ...state };
  state.recent = [...state.recent, state.path.pop() as string];
  state.path = [...state.path];
  return { ...state };
}

export function FORWARD_BUTTON_PRESSED(state: FileSystemState, action: FileSystemAction) {
  if (state.recent.length === 0) return { ...state };
  state.path = [...state.path, state.recent.pop() as string];
  state.recent = [...state.recent];
  return { ...state };
}

export function FOLDER_DOUBLE_CLICKED(state: FileSystemState, action: FileSystemAction) {
  const folderPath = action.payload.folderPath;
  state.path.push(folderPath);
  state.recent = [];
  state.path = [...state.path];

  return { ...state };
}
