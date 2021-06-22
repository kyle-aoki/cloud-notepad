import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as XButtonSVG } from '../../assets/cancel.svg';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { ReactComponent as CloudIcon } from '../../assets/cloud.svg';
import { ReactComponent as RightChevronIcon } from '../../assets/right-chevron.svg';
import { useDispatch } from 'react-redux';
import useUserDirectory from './use-user-directory';
import {
  HeaderContainer,
  HeaderName,
  HeaderDateMod,
  HeaderExt,
  HeaderSize,
  FileSystemContainer,
  TopContainer,
  HandleContainer,
  Handle,
  Title,
  XButton,
  Taskbar,
  ArrowsContainer,
  PathContainer,
  StorageCapacity,
  Container,
  Sidebar,
  ViewContainer,
  View,
  Controller,
  Button,
  ButtonContainer,
} from './styled-components';
import { File, Folder } from './objects';
import { FileSystemActions } from '../../redux/reducers/file-system/reducer';
import { useFileSystemControl } from '../../redux/reducers/file-system/control';

export default function FileSystem() {
  let [response, setResponse] = useState<any>();
  let [path, setPath] = useState<string[]>([]);
  let [recent, setRecent] = useState<string[]>([]);

  const FileSystemControl = useFileSystemControl();

  const [loading, userDirectory] = useUserDirectory();

  const dispatch = useDispatch();

  const handleXButtonClick = () => FileSystemControl.CLOSE_FILE_SYSTEM();

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
}

export const XButtonSVGContainer: FC = () => {
  const style = {
    width: '10px',
    height: '10px',
    fill: 'white',
  };
  return <XButtonSVG style={style} />;
};

const CloudIconStyle = {
  fill: 'white',
  width: '15px',
  height: '15px',
  marginRight: '4px',
  marginTop: '4px',
};

export const Arrow: FC<any> = ({ right, onClick }) => {
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

const ArrowButton = styled.div`
  color: black;
  user-select: none;
  cursor: default;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
`;
