import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
import DirObject from '../../model/dir-object';
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
} from './styled-components';

const FSObjectIconStyle = { fill: 'white', width: '15px', height: '15px' };

interface FileProps {
  dirObject: DirObject;
}

export const File: FC<FileProps> = ({ dirObject }) => {
  const { fileName, lastModified, fileSize } = dirObject;

  return (
    <FileContainer>
      <FileIcon style={FSObjectIconStyle} />
      <FileName>{fileName}</FileName>
      <FileDateMod>{lastModified}</FileDateMod>
      <FileExt>.txt</FileExt>
      <FileSize>{fileSize}</FileSize>
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
        <FolderDateMod>{lastModified}</FolderDateMod>
        <FolderType>File folder</FolderType>
        <FolderSize></FolderSize>
      </FolderContainer>
    </>
  );
};
