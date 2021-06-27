import React, { FC } from 'react';
import styled from 'styled-components';
import { useLogInControl, useLogInState } from '../../redux/reducers/log-in/control';
import {
  AccountCreationContainer,
  AccountCreationPaneElement,
  AccountCreationTaskbar,
  CloudNotepadTitle,
  ContentPane,
  PasswordInput,
  UsernameInput,
  Button,
  Spinner,
} from '../account-creation/index';
import { XButtonSVGContainer } from '../file-system/file-system';
import { XButton } from '../file-system/styled-components';

interface LogInModalProps {}

export const LogInModal: FC<LogInModalProps> = ({}) => {
  const LogInControl = useLogInControl();
  const LogInState = useLogInState();

  const handleLogInClick = () => {
    if (!LogInState.loading) {
      LogInControl.SUBMIT_LOG_IN(LogInState.username, LogInState.password);
      LogInControl.START_LOADING();
    }
  };

  return (
    <AccountCreationContainer className={LogInState.showLogInModal ? 'Show' : 'Hidden'}>
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={() => LogInControl.TOGGLE_LOG_IN_MODAL()}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane>
          <UsernameInput id="username" onChange={(e) => LogInControl.UPDATE_FIELD(e.target.id, e.target.value)} />
          <PasswordInput id="password" onChange={(e) => LogInControl.UPDATE_FIELD(e.target.id, e.target.value)} />
          <LogInButton clicked={LogInState.loading} onClick={handleLogInClick}>
            {LogInState.loading ? <Spinner /> : 'Log In'}
          </LogInButton>
        </ContentPane>
      </AccountCreationPaneElement>
    </AccountCreationContainer>
  );
};

const LogInButton = styled(Button)`
  margin-top: auto;
  &:active {
    transform: scale(0.99);
  }
`;
