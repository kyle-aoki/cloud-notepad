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
