import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as CloudIcon } from '../../assets/cloud.svg';
import { Arrow, CloudIconStyle, SubPath, XButtonSVGContainer } from './components';
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
import { FileSystem, useFileSystemState } from './redux'

export default function FileSystemComponent() {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const { userDir, path } = useFileSystemState();

  return (
    <FileSystemContainer>
      <TopContainer>
        <HandleContainer>
          <Handle>
            <Title>File Explorer - Open</Title>
          </Handle>
          <XButton onClick={() => FileSystemController.CLOSE_FILE_SYSTEM()}>
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
              return <SubPath key={index} last={last}>{subpath}</SubPath>;
            })}
          </PathContainer>
          <StorageCapacity>{'0 KB'} / 1000 KB</StorageCapacity>
        </Taskbar>
      </TopContainer>
      <Container>
        <Sidebar></Sidebar>
        <ViewContainer>
          <View>{userDir}</View>
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
  );
}
