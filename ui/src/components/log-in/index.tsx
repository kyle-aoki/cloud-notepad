import React, { FC } from 'react';
import styled from 'styled-components';
import { useLogInControl, useLogInState } from '../../redux/reducers/log-in/control';
import {
  AccountCreationContainer,
  AccountCreationPaneElement,
  AccountCreationTaskbar,
  CloudNotepadTitle,
  ContentPane,
} from '../account-creation/index';
import { XButtonSVGContainer } from '../file-system/file-system';
import { XButton } from '../file-system/styled-components';

interface LogInModalProps {}

export const LogInModal: FC<LogInModalProps> = ({}) => {
  const LogInControl = useLogInControl();
  const LogInState = useLogInState();

  return (
    <AccountCreationContainer className={LogInState.showLogInModal ? 'Show' : 'Hidden'}>
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={() => LogInControl.TOGGLE_LOG_IN_MODAL()}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane></ContentPane>
      </AccountCreationPaneElement>
    </AccountCreationContainer>
  );
};
