import { FC, useState } from 'react';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
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

export const File: FC<any> = ({ fileName, size, lastModified, onClick, onDoubleClick }) => {
  const [selected, setSelected] = useState<boolean>(false);
  if (fileName.length > 20) fileName = fileName.substring(0, 10) + '...' + fileName.substring(fileName.length - 10);
  return (
    <FileContainer selected={selected} onClick={() => onClick(selected, setSelected)} onDoubleClick={onDoubleClick}>
      <FileIcon style={FSObjectIconStyle} />
      <FileName>{fileName}</FileName>
      <FileDateMod>{lastModified}</FileDateMod>
      <FileExt>.txt</FileExt>
      <FileSize>{size}</FileSize>
    </FileContainer>
  );
};

export const Folder: FC<any> = ({ onClick, folderName, lastModified }) => {
  return (
    <>
      <FolderContainer onDoubleClick={onClick}>
        <FolderIcon style={FSObjectIconStyle} />
        <FolderName>{folderName}</FolderName>
        <FolderDateMod>{lastModified}</FolderDateMod>
        <FolderType>File folder</FolderType>
        <FolderSize></FolderSize>
      </FolderContainer>
    </>
  );
};
