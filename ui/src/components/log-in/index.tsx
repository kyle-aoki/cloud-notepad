import React, { FC } from 'react';
import styled from 'styled-components';
import { LogInControl, useLogInState } from './redux/control';
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
import { useDispatch } from 'react-redux';

interface LogInModalProps {}

export const LogInModal: FC<LogInModalProps> = ({}) => {
  const LogInController = new LogInControl(useDispatch());
  const LogInState = useLogInState();

  const handleLogInClick = () => {
    if (!LogInState.loading) {
      LogInController.SUBMIT_LOG_IN(LogInState.username, LogInState.password);
    }
  };

  return (
    <AccountCreationContainer className={LogInState.showLogInModal ? 'Show' : 'Hidden'}>
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={() => LogInController.TOGGLE_LOG_IN_MODAL()}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane>
          <UsernameInput id="username" onChange={(e) => LogInController.UPDATE_FIELD(e.target.id, e.target.value)} />
          <PasswordInput id="password" onChange={(e) => LogInController.UPDATE_FIELD(e.target.id, e.target.value)} />
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
