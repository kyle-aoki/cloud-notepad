import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as CloudIcon } from '../../assets/cloud.svg';
import { Arrow, CloudIconStyle, Header, SubPath, XButtonSVGContainer } from './components';
import { File, Folder } from './objects';
import { FileSystemControl, useFileSystemState } from './redux/control';
import {
  ArrowsContainer,
  Button,
  ButtonContainer,
  Container,
  Controller,
  FileSystemContainer,
  Handle,
  HandleContainer,
  PathContainer,
  Sidebar,
  StorageCapacity,
  Taskbar,
  Title,
  TopContainer,
  View,
  ViewContainer,
  XButton,
} from './styled-components';
import { getCurrentPath, getPath } from './util';

export default function FileSystem() {
  const FileSystemController = new FileSystemControl(useDispatch());
  const { userDir, path } = useFileSystemState();

  const handleXButtonClick = () => FileSystemController.CLOSE_FILE_SYSTEM();

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
              <Arrow onClick={() => FileSystemController.BACK_BUTTON_PRESSED()} />
              <Arrow right onClick={() => FileSystemController.FORWARD_BUTTON_PRESSED()} />
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
            <StorageCapacity>{'0 KB'} / 1000 KB</StorageCapacity>
          </Taskbar>
        </TopContainer>
        <Container>
          <Sidebar></Sidebar>
          <ViewContainer>
            <View></View>
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
