import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as CloudIcon } from '../../assets/cloud.svg';
import { Arrow, CloudIconStyle, SubPath, XButtonSVGContainer } from './components';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
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
  StorageCapacityFillBar,
  StorageCapacityText,
  DisabledButton,
} from './styled-components';
import { FileSystem, useFileSystemState } from './redux';
import styled from 'styled-components';
import { FSObjectIconStyle } from './objects';
import { Editor, useEditorState } from '../editor/redux';
import { Spinner } from '../../ui/spinner';
import { useCreateFolder } from './hooks/use-create-folder';

export default function FileSystemComponent() {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const {
    userDir,
    userDirLoading,
    path,
    mode,
    newFileName,
    newFileExtension,
    saveFileLoading,
    totalMemory,
    fileSuccessfullySaved,
  } = useFileSystemState();

  const { fileContent } = useEditorState();

  useCreateFolder();

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
            <NewFolderIconContainer onClick={() => FileSystemController.START_FOLDER_CREATION_PROCESS()}>
              <FolderIcon style={FSObjectIconStyle} />
            </NewFolderIconContainer>
          </ArrowsContainer>
          <PathContainer>
            <SubPath>
              <CloudIcon style={CloudIconStyle} />
            </SubPath>
            {path.map((subpath: string, index: number, array: string[]) => {
              const last = index === array.length - 1;
              return (
                <SubPath key={index} last={last}>
                  {subpath}
                </SubPath>
              );
            })}
          </PathContainer>
          <StorageCapacity>
            <StorageCapacityFillBar memory={totalMemory} />
            <StorageCapacityText>{totalMemory} B / 1000 B</StorageCapacityText>
          </StorageCapacity>
        </Taskbar>
      </TopContainer>
      <Container>
        <Sidebar></Sidebar>
        <ViewContainer>
          {userDirLoading ? (
            <SpinnerContainer>
              <Spinner width={50} height={50} thickness={4} />
            </SpinnerContainer>
          ) : (
            <View>{userDir}</View>
          )}
        </ViewContainer>
      </Container>
      <Controller>
        {mode === FileSystem.Mode.OPEN_FILE && (
          <>
            <Button>Delete</Button>
            <ButtonContainer>
              <Button>Move</Button>
              <Button>Open</Button>
            </ButtonContainer>
          </>
        )}
        {mode === FileSystem.Mode.SAVE_NEW_FILE && (
          <>
            {!fileSuccessfullySaved && (
              <FileNameInputContainer>
                <FileNameLabel>File name:</FileNameLabel>
                <FileNameInput
                  id="newFileName"
                  value={newFileName}
                  onChange={(e) => FileSystemController.UPDATE_FIELD(e.target.id, e.target.value)}
                />
                <FileExtensionInput
                  id="newFileExtension"
                  value={newFileExtension}
                  onChange={(e) => FileSystemController.UPDATE_FIELD(e.target.id, e.target.value)}
                />
              </FileNameInputContainer>
            )}
            <ButtonContainer>
              {fileSuccessfullySaved ? (
                <DisabledButton disabled>Save</DisabledButton>
              ) : (
                <Button
                  onClick={() =>
                    FileSystemController.SAGA.SAVE_NEW_FILE(path, newFileName, newFileExtension, fileContent)
                  }
                >
                  {saveFileLoading ? <Spinner /> : 'Save'}
                </Button>
              )}
            </ButtonContainer>
          </>
        )}
      </Controller>
    </FileSystemContainer>
  );
}

export const NewFolderIconContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 0px 5px;
  margin: 5px 2px;
  &:hover {
    background-color: gray;
  }
  &:active {
    background-color: #585858;
  }
`;

export const FileNameInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const FileNameLabel = styled.div`
  font-size: 12px;
`;

export const SaveFileInput = styled.input.attrs((props: any) => ({
  spellCheck: false,
}))`
  font-size: 12px;
  outline: none;
  background-color: #383838;
  border: 1px solid white;
  color: white;
  height: 22px;
`;

export const FileNameInput = styled(SaveFileInput)`
  width: 320px;
`;
export const FileExtensionInput = styled(SaveFileInput)`
  width: 50px;
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding-right: 40px;
`;
