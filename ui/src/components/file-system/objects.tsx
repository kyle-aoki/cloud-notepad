import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
import DirObject from '../../model/dir-object';
import { Spinner } from '../../ui/spinner';
import { FileSystem, useFileSystemState } from './redux';
import {
  FileContainer,
  FileDateMod,
  FileExt,
  FileName,
  FileSize,
  FolderContainer,
  FolderDateMod,
  FolderName,
  FolderSize,
  FolderType,
  CreateNewFolderContainer,
} from './styled-components';

export const FSObjectIconStyle = { fill: 'white', width: '15px', height: '15px' };

interface FileProps {
  dirObject: DirObject;
}

export const File: FC<FileProps> = ({ dirObject }) => {
  const { fileName, filePath, lastModified, fileSize } = dirObject;
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { selected, lastClickTime, fileOpening } = useFileSystemState();

  const isSelected = selected === fileName;
  const isBeingOpened = fileOpening === fileName;

  return (
    <FileContainer
      isSelected={isSelected}
      onClick={() => FileSystemController.SAGA.HANDLE_FILE_CLICK(lastClickTime, fileName, filePath)}
    >
      {isBeingOpened ? <Spinner /> : <FileIcon style={FSObjectIconStyle} />}
      <FileName>{fileName}</FileName>
      <FileDateMod>{new Date(lastModified).toLocaleString()}</FileDateMod>
      <FileExt>.txt</FileExt>
      <FileSize>{fileSize} B</FileSize>
    </FileContainer>
  );
};

export const Folder: FC<any> = ({ dirObject, folderName }) => {
  const { lastModified } = dirObject;
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { selected, lastClickTime } = useFileSystemState();

  const isSelected = selected === folderName;

  return (
    <>
      <FolderContainer
        isSelected={isSelected}
        onClick={() => FileSystemController.SAGA.HANDLE_FOLDER_CLICK(lastClickTime, folderName)}
      >
        <FolderIcon style={FSObjectIconStyle} />
        <FolderName>{folderName}</FolderName>
        <FolderDateMod>{new Date(lastModified).toLocaleString()}</FolderDateMod>
        <FolderType>File folder</FolderType>
        <FolderSize></FolderSize>
      </FolderContainer>
    </>
  );
};

export const CreateNewFolder: FC<any> = ({ dirObject, folderName }) => {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { newFolderName, newFolderLoading } = useFileSystemState();
  return (
    <>
      <CreateNewFolderContainer>
        {newFolderLoading ? <Spinner /> : <FolderIcon style={FSObjectIconStyle} />}
        <FolderName>
          {newFolderLoading ? (
            <>{newFolderName}</>
          ) : (
            <CreateNewFolderInput
              value={newFolderName}
              onChange={(e) => FileSystemController.UPDATE_FOLDER_NAME(e.target.value)}
            />
          )}
        </FolderName>
        <FolderDateMod></FolderDateMod>
        <FolderType></FolderType>
        <FolderSize></FolderSize>
      </CreateNewFolderContainer>
    </>
  );
};

const CreateNewFolderInput = styled.input.attrs((props: any) => ({
  spellCheck: false,
}))`
  outline: none;
  border: 1px solid white;
  background-color: #4d4d4d;
  color: white;
  height: 20px;
`;
