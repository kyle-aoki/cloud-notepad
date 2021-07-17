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

export const FSObjectIconStyle = { fill: 'white', width: '15px', height: '15px' };

interface FileProps {
  dirObject: DirObject;
}

export const File: FC<FileProps> = ({ dirObject }) => {
  const { fileName, filePath, lastModified, fileSize } = dirObject;
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { selected, lastClickTime } = useFileSystemState();

  const isSelected = selected === fileName;

  return (
    <FileContainer
      isSelected={isSelected}
      onClick={() => FileSystemController.SAGA.HANDLE_FILE_CLICK(lastClickTime, fileName, filePath)}
    >
      <FileIcon style={FSObjectIconStyle} />
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
