import { FileSystem } from './redux';

export const getCurrentPath = (path: string[]) => path.join('/');
export const getPath = (pathArray: string[]) => pathArray.join('/');

const TOTAL_MEMORY_LOCAL_STORAGE_KEY = 'totalMemory' as const;

export function getTotalMemoryFromLocalStorage() {
  try {
    return parseInt(localStorage.getItem(TOTAL_MEMORY_LOCAL_STORAGE_KEY) || '0');
  } catch (e) {
    return 0;
  }
}

export function setTotalMemoryInLocalStorage(totalMemory: number) {
  localStorage.setItem(TOTAL_MEMORY_LOCAL_STORAGE_KEY, totalMemory.toString());
}

const FILE_SAVE_STATE_LOCAL_STOAGE_KEY = 'fileSaveState' as const;

export function getFileSaveStateFromLocalStorage(): FileSystem.FileSaveState {
  return localStorage.getItem(FILE_SAVE_STATE_LOCAL_STOAGE_KEY) as FileSystem.FileSaveState || FileSystem.FileSaveState.NEW_FILE_PURE;
}
export function setFileSaveStateToLocalStorage(fileSaveState: FileSystem.FileSaveState) {
  localStorage.setItem(FILE_SAVE_STATE_LOCAL_STOAGE_KEY, fileSaveState);
}
