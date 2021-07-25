import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { XButtonSVGContainer } from '../file-system/components';
import { useFileSystemState } from '../file-system/redux';
import { Button, XButton } from '../file-system/styled-components';
import { useSaveModalState } from './redux';
import { SaveModal } from './redux';

export const SaveModalComponent: FC = () => {
  const { fileName } = useFileSystemState();
  const { open } = useSaveModalState();

  const SaveModalController = new SaveModal.Instance(useDispatch());

  return (
    <>
      {open && (
        <SaveModalContainer>
          <SaveModalTaskbar>
            <TaskbarMessage>Cloud Notepad</TaskbarMessage>
            <XButton onClick={() => SaveModalController.CLOSE()}>
              <XButtonSVGContainer />
            </XButton>
          </SaveModalTaskbar>
          <MessageContainer>Do you want to save changes to {fileName}?</MessageContainer>
          <ButtonContainer>
            <CancelButton onClick={() => SaveModalController.CLOSE()}>Cancel</CancelButton>
            <DontSaveButton>Don't Save</DontSaveButton>
            <SaveButton>Save</SaveButton>
          </ButtonContainer>
        </SaveModalContainer>
      )}
    </>
  );
};

export const SaveModalContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 400px;
  height: 170px;
  background-color: #35363a;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const SaveModalTaskbar = styled.div`
  background-color: var(--blue);
  width: 100%;
  height: 55px;
  display: flex;
`;

export const TaskbarMessage = styled.div`
  height: 100%;
  padding-left: 10px;
  display: grid;
  place-items: center;
  font-size: 12px;
  user-select: none;
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 20px;
  padding-top: 10px;
  font-size: 18px;
  user-select: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 110px;
  gap: 12px;
  padding-right: 14px;
  background-color: #2d2e30;
  border-top: 1px solid #28292b;
`;

export const SaveButton = styled(Button)`
  min-width: 0;
  width: 76px;
`;
export const DontSaveButton = styled(Button)`
  width: 92px;
`;
export const CancelButton = styled(Button)`
  min-width: 0;
  width: 76px;
`;
