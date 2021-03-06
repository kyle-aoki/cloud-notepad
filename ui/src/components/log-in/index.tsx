import React, { FC } from 'react';
import styled from 'styled-components';
import { XButtonSVGContainer } from '../file-system/components';
import { Button, XButton } from '../file-system/styled-components';
import { useDispatch } from 'react-redux';
import { LogIn, useLogInState } from './redux';
import { Spinner } from '../../ui/spinner';
import {
  AccountCreationContainer,
  AccountCreationPaneElement,
  AccountCreationTaskbar,
  CloudNotepadTitle,
  ContentPane,
  UsernameInput,
  PasswordInput,
} from '../account-creation/styled';

interface LogInModalProps {}

export const LogInModal: FC<LogInModalProps> = () => {
  const LogInController = new LogIn.Instance(useDispatch());
  const { loading, showLogInModal, username, password } = useLogInState();

  return (
    <AccountCreationContainer className={showLogInModal ? 'Show' : 'Hidden'}>
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={() => LogInController.TOGGLE_LOG_IN_MODAL()}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane>
          <UsernameInput
            id="username"
            value={username}
            onChange={(e) => LogInController.UPDATE_FIELD(e.target.id, e.target.value)}
          />
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => LogInController.UPDATE_FIELD(e.target.id, e.target.value)}
          />
          <LogInButton
            clicked={loading}
            onClick={() => LogInController.SAGA.SUBMIT_LOG_IN(username, password, loading)}
          >
            {loading ? <Spinner /> : 'Log In'}
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
