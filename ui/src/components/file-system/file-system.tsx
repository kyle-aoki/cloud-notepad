import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as XButtonSVG } from '../../assets/cancel.svg';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
import { ReactComponent as CloudIcon } from '../../assets/cloud.svg';
import { ReactComponent as RightChevronIcon } from '../../assets/right-chevron.svg';
import { useDispatch } from 'react-redux';
import { FileSystemActions } from '../../redux/reducers/file-system';
import useUserDirectory from './use-user-directory';

const FileSystemContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #262626;
  resize: vertical;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HandleContainer = styled.div`
  height: 29px;
  width: 100%;
  background-color: #000000;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 12px;
  user-select: none;
`;

const Handle = styled.div.attrs((props: any) => ({
  id: 'handle',
}))`
  width: 100%;
  background-color: black;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const XButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 46px;
  height: 28px;
  transition: background-color 0.18s ease-out;
  &:hover {
    transition: background-color 0.05s ease-out;
    background-color: #e81123;
  }
  &:active {
    background-color: #8b0a14;
  }
`;

const Taskbar = styled.div`
  width: 100%;
  height: 35px;
  border-bottom: 1px solid white;
  background-color: #191919;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-right: 15px;
`;

const PathContainer = styled.div`
  background-color: #191919;
  border: 0.5px solid #535353;
  user-select: none;
  width: 100%;
  height: 25px;
  padding-left: 15px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const StorageCapacity = styled.div`
  background-color: #191919;
  color: #dedede;
  user-select: none;
  border: 0.7px solid #535353;
  width: 200px;
  height: 25px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 40px;
  height: 100%;
  background-color: #191919;
  border-right: 1px solid #131313;
`;

const ViewContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #202020;
  border-left: 1px solid #2b2b2b;
  overflow-y: scroll;
  ::-webkit-scrollbar-button {
    height: 9px;
  }
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;

const StatusBar = styled.div`
  width: 100%;
  height: 17px;
  background-color: #333333;
`;

export const XButtonSVGContainer: FC = () => {
  const style = {
    width: '10px',
    height: '10px',
    fill: 'white',
  };
  return <XButtonSVG style={style} />;
};

const ArrowsContainer = styled.div`
  height: 100%;
  display: flex;
`;

const ArrowButton = styled.div`
  user-select: none;
  cursor: default;
  width: 45px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FSObject = styled.div<any>`
  height: 22px;
  width: 100%;
  user-select: none;
  padding-left: 7px;
  padding-right: 7px;
  font-size: 14px;
  cursor: default;
  background-color: ${(props: any) => props.selected && '#777777'};
  &:hover {
    background-color: ${(props: any) => (props.selected ? '#777777' : '#4d4d4d')};
  }
  &:active {
    background-color: #777777;
  }
  display: grid;
  grid-template-columns: 25px 4fr 4fr 3fr 2fr;
  grid-template-rows: 1fr;
  align-items: center;
`;

const HeaderContainer = styled(FSObject)`
  color: #dedede;
  margin-bottom: 8px;
  &:hover {
    background-color: inherit;
  }
`;

const HeaderName = styled.div`
  padding-top: 2px;
  margin-left: -3px;
  height: 100%;
`;
const HeaderSize = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;
const HeaderDateMod = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;
const HeaderExt = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;

const FileContainer = styled(FSObject)``;

const FileName = styled.div``;
const FileSize = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #dedede;
  padding-left: 7px;
`;
const FileDateMod = styled.div`
  color: #dedede;
  padding-left: 7px;
`;
const FileExt = styled.div`
  color: #dedede;
  padding-left: 7px;
`;

const FolderContainer = styled(FSObject)``;

const FolderName = styled.div``;
const FolderSize = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #dedede;
  padding-left: 7px;
`;
const FolderDateMod = styled.div`
  color: #dedede;
  padding-left: 7px;
`;
const FolderType = styled.div`
  color: #dedede;
  padding-left: 7px;
`;

const Controller = styled.div`
  background-color: #383838;
  display: flex;
  width: 100%;
  padding: 10px 15px;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  gap: 13px;
`;

// 174 × 51 --? 85 x 25

const Button = styled.div`
  user-select: none;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 88px;
  height: 26px;
  border: 1px solid white;
  font-size: 12px;
  background-color: #383838;
  &:hover {
    background-color: #454545;
  }
  &:active {
    background-color: #666666;
  }
`;

interface FileSystemProps {}

const Arrow: FC<any> = ({ right, onClick }) => {
  return (
    <ArrowButton className="ArrowContainer" onClick={onClick}>
      {right ? <RightArrow className="Arrow" /> : <LeftArrow className="Arrow" />}
    </ArrowButton>
  );
};

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderName>Name</HeaderName>
      <div></div>
      <HeaderDateMod>Last Modified</HeaderDateMod>
      <HeaderExt>Type</HeaderExt>
      <HeaderSize>Size</HeaderSize>
    </HeaderContainer>
  );
};

const FSObjectIconStyle = { fill: 'white', width: '15px', height: '15px' };
const CloudIconStyle = {
  fill: 'white',
  width: '15px',
  height: '15px',
  marginRight: '4px',
  marginTop: '4px',
};

const File: FC<any> = ({ fileName, size, lastModified, onClick, onDoubleClick }) => {
  const [selected, setSelected] = useState<boolean>(false);
  if (fileName.length > 20)
    fileName = fileName.substring(0, 10) + '...' + fileName.substring(fileName.length - 10);
  return (
    <FileContainer
      selected={selected}
      onClick={() => onClick(selected, setSelected)}
      onDoubleClick={onDoubleClick}
    >
      <FileIcon style={FSObjectIconStyle} />
      <FileName>{fileName}</FileName>
      <FileDateMod>{lastModified}</FileDateMod>
      <FileExt>.txt</FileExt>
      <FileSize>{size}</FileSize>
    </FileContainer>
  );
};
const Folder: FC<any> = ({ onClick, folderName, lastModified }) => {
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

const SubPathContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SubPathTextContainer = styled.div``;

const SubPath: FC<any> = ({ children, last }) => {
  const chevronStyle = {
    fill: '#808080',
    width: '8px',
    height: '8px',
    margin: '0 8px',
    marginTop: '3px',
  };
  return (
    <SubPathContainer>
      <SubPathTextContainer>{children}</SubPathTextContainer>
      {!last && <RightChevronIcon style={chevronStyle} />}
    </SubPathContainer>
  );
};

const FileSystem: FC<FileSystemProps> = () => {
  let [response, setResponse] = useState<any>();
  let [path, setPath] = useState<string[]>([]);
  let [recent, setRecent] = useState<string[]>([]);

  const [loading, userDirectory] = useUserDirectory();

  const dispatch = useDispatch();
  let FSActions = {
    CLOSE: () => dispatch({ type: FileSystemActions.CLOSE_FILE_SYSTEM }),
  };

  const handleXButtonClick = () => FSActions.CLOSE();

  const handleFileClick = (selected: boolean, setSelected: Function) => {
    setSelected(!selected);
  };

  const getCurrentPath = () => path.join('/');
  const getPath = (pathArray: string[]) => pathArray.join('/');

  const backButtonHandler = () => {
    if (path.length === 0) return;
    setRecent([...recent, path.pop() as string]);
    setPath([...path]);
  };

  const fowardButtonHandler = () => {
    if (recent.length === 0) return;
    setPath([...path, recent.pop() as string]);
    setRecent([...recent]);
  };

  const folderOnClickHandler = (folderPath: string) => {
    path.push(folderPath);
    setRecent([]);
    setPath([...path]);
  };

  const currentDir: any = [<Header key={-1} />];

  if (userDirectory) {
    let index = 0;
    for (const object of userDirectory) {
      if (!object.isFolder) continue;
      if (getCurrentPath() !== getPath(object.path)) continue;
      currentDir.push(
        <Folder
          onClick={() => folderOnClickHandler(object.itemName)}
          key={index}
          folderName={object.itemName}
          lastModified={object.lastModified}
        />
      );
      index++;
    }
    for (const object of userDirectory) {
      if (object.isFolder) continue;
      if (getCurrentPath() !== getPath(object.path)) continue;
      currentDir.push(
        <File
          onClick={handleFileClick}
          key={index}
          fileName={object.itemName}
          size={object.size}
          lastModified={object.lastModified}
          fileExtension={object.itemName}
        />
      );
      index++;
    }
  }

  return (
    <>
      <FileSystemContainer>
        <TopContainer>
          <HandleContainer>
            <Handle>
              <Title>File Explorer - Open</Title>
            </Handle>
            <XButton onClick={handleXButtonClick}>
              <XButtonSVGContainer />
            </XButton>
          </HandleContainer>
          <Taskbar>
            <ArrowsContainer>
              <Arrow onClick={backButtonHandler} />
              <Arrow right onClick={fowardButtonHandler} />
            </ArrowsContainer>
            <PathContainer>
              <SubPath>
                <CloudIcon style={CloudIconStyle} />
              </SubPath>
              <SubPath>Cloud Storage</SubPath>
              {path.map((subpath: string, index: number, array: string[]) => {
                // if (index === 0) return;
                // if (index === array.length - 1) return subpath.replace('/', '');
                const last = index === array.length - 1;
                return <SubPath last={last}>{subpath}</SubPath>;
              })}
            </PathContainer>
            <StorageCapacity>{response?.dirSize || '0 KB'} / 1000 KB</StorageCapacity>
          </Taskbar>
        </TopContainer>
        <Container>
          <Sidebar></Sidebar>
          <ViewContainer>
            <View>{loading ? <div>loading...</div> : currentDir}</View>
          </ViewContainer>
        </Container>
        <Controller>
          {/* <ButtonContainer>
            <Button>Save</Button>
            <Button>Cancel</Button>
          </ButtonContainer> */}
          <Button>Delete</Button>
          <ButtonContainer>
            <Button>Move</Button>
            <Button>Open</Button>
          </ButtonContainer>
        </Controller>
      </FileSystemContainer>
    </>
  );
};

export default FileSystem;
