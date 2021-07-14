import { FC, useState } from 'react';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
import DirObject from '../../model/dir-object';
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

interface File {
  dirObject: DirObject;
}

export const File: FC<File> = ({ dirObject }) => {
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
  
  return (
    <>
      <FolderContainer >
        <FolderIcon style={FSObjectIconStyle} />
        <FolderName>{folderName}</FolderName>
        <FolderDateMod>{lastModified}</FolderDateMod>
        <FolderType>File folder</FolderType>
        <FolderSize></FolderSize>
      </FolderContainer>
    </>
  );
};
