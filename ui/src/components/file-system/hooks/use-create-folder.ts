import { KeyboardEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FileSystem, useFileSystemState } from '../redux';

export const useCreateFolder = () => {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { path, selected, selectedOnCreatingFolder, creatingFolder, newFolderName } = useFileSystemState();

  const onEnterPressed = useCallback((e: any) => {
    const key = e.key;
    if (key === 'Enter') {
      FileSystemController.SAGA.CREATE_FOLDER(path, newFolderName);
    }
  }, [FileSystemController, path, newFolderName]);

  useEffect(() => {
    // if (!creatingFolder) return;
    window.addEventListener('keydown', onEnterPressed);
    return () => window.removeEventListener('keydown', onEnterPressed);
  }, [FileSystemController, path, newFolderName]);
  

  useEffect(() => {
    if (!creatingFolder) return;
    if (selected === selectedOnCreatingFolder) return;

    FileSystemController.SAGA.CREATE_FOLDER(path, newFolderName);
  }, [selected, creatingFolder]);
};
