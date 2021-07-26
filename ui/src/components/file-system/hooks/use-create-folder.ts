import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FileSystem, useFileSystemState } from '../redux';

export const useCreateFolder = () => {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { path, newFolderName } = useFileSystemState();

  // prettier-ignore
  const onEnterPressed = useCallback((e: any) => {
    const key = e.key;
    if (key === 'Enter') {
      FileSystemController.SAGA.CREATE_FOLDER(path, newFolderName);
    }
  }, [path, newFolderName, FileSystemController.SAGA]);

  useEffect(() => {
    window.addEventListener('keydown', onEnterPressed);
    return () => window.removeEventListener('keydown', onEnterPressed);
  }, [onEnterPressed, path, newFolderName]);
};
