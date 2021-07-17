import React, { FC } from 'react';
import { useFileSystemState } from './redux';
import { v4 } from 'uuid';
import DirObject from '../../model/dir-object';
import { File, Folder } from './objects'
import { Header } from './components';

interface UserDirProps {
  userDir: DirObject[];
}

enum Result {
  isFolder,
  isFile,
  notInDir,
}

export const dirInitialState = [<Header key={-1}/>];

export const UserDir: FC<UserDirProps> = ({ userDir }) => {
  const { path } = useFileSystemState();
  const dirContents: any[] = [...dirInitialState];
  const folders: string[] = [];

  for (let i = 0; i < userDir.length; i += 1) {
    const obj = userDir[i];

    const result = inDir(path, obj.filePath);

    // prettier-ignore
    switch (result[0]) {
      case Result.isFolder:
        if (folders.includes(result[1] as string)) continue;
        folders.push(result[1] as string);
        dirContents.push(createFolder(obj, result[1] as string));
        continue;
      case Result.isFile:
        dirContents.push(createFile(obj));
        continue;
      case Result.notInDir: continue;
    }
  }

  return <>{dirContents}</>;
};

function inDir(path: string[], filePath: string[]) {
  if (path.length > filePath.length) return [Result.notInDir];

  for (let i = 0; i < filePath.length; i += 1) {
    const subpath = path[i];
    const fileSubPath = filePath[i];

    if (subpath === undefined) return [Result.isFolder, fileSubPath];

    if (subpath === fileSubPath) continue;
    return [Result.notInDir];
  }
  return [Result.isFile];
}

function createFolder(dirObject: DirObject, folderName: string) {
  return <Folder key={v4()} dirObject={dirObject} folderName={folderName}/>;
}
function createFile(dirObject: DirObject) {
  return <File key={v4()} dirObject={dirObject} />;
}

// path [ "folder1" ]
// file [ "folder1", "folder2"]

// path [ "folder3", "folder4" ]
// file [ "folder1", "folder2" ]
