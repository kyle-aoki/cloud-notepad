import React, { FC } from 'react';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { ArrowButton, ButtonContainer, XButton } from '../file-system/styled-components';
import { useDispatch } from 'react-redux';
import { XButtonSVGContainer } from '../file-system/components';
import { AccountCreation, useAccountCreationState } from './redux';
import { Spinner } from '../../ui/spinner';
import {
  AccountCreationContainer,
  AccountCreationPaneElement,
  AccountCreationTaskbar,
  CloudNotepadTitle,
  ContentPane,
  CreateAccountTitle,
  UsernameInput,
  ActionButton,
  ArrowContainer,
  PasswordInput,
  Spacer,
} from './styled';

interface AccountCreationPaneProps {}

const AccountCreationModal: FC<AccountCreationPaneProps> = () => {
  const AccountCreationState = useAccountCreationState();
  const AccountCreationController = new AccountCreation.Instance(useDispatch());

  return (
    <AccountCreationContainer className={AccountCreationState.createAccountModalOpen ? 'Show' : 'Hidden'}>
      {AccountCreationState.createAccountModalOpen ? (
        <AccountCreationPaneElement>
          <AccountCreationTaskbar>
            <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
            <XButton onClick={() => AccountCreationController.CLOSE_MODAL()}>
              <XButtonSVGContainer />
            </XButton>
          </AccountCreationTaskbar>
          <ContentPane>
            {AccountCreationState.accountCreationScreen === AccountCreation.Screen.USERNAME_INPUT ? (
              <>
                <CreateAccountTitle>Create Account</CreateAccountTitle>

                <UsernameInput
                  id="username"
                  value={AccountCreationState.username}
                  onChange={(e) => AccountCreationController.UPDATE_INPUT(e.target.id, e.target.value)}
                />

                <Spacer />
                <ButtonContainer>
                  <ActionButton
                    clicked={AccountCreationState.usernameLoading}
                    onClick={() =>
                      AccountCreationController.CHECK_USERNAME(
                        AccountCreationState.username,
                        AccountCreationState.usernameLoading
                      )
                    }
                  >
                    {AccountCreationState.usernameLoading ? <Spinner /> : 'Next'}
                  </ActionButton>
                </ButtonContainer>
              </>
            ) : (
              <>
                <CreateAccountTitle>Select Password</CreateAccountTitle>
                <ArrowContainer>
                  <ArrowButton
                    className="ArrowContainer"
                    onClick={() => AccountCreationController.GO_BACK_TO_USERNAME_SCREEN()}
                  >
                    <LeftArrow className="Arrow" />
                  </ArrowButton>
                  {AccountCreationState.username}
                </ArrowContainer>
                <PasswordInput
                  id="password"
                  value={AccountCreationState.password}
                  onChange={(e) => AccountCreationController.UPDATE_INPUT(e.target.id, e.target.value)}
                />

                <ButtonContainer>
                  <ActionButton
                    clicked={AccountCreationState.passwordLoading}
                    onClick={() =>
                      AccountCreationController.CHECK_PASSWORD(
                        AccountCreationState.username,
                        AccountCreationState.password,
                        AccountCreationState.passwordLoading
                      )
                    }
                  >
                    {AccountCreationState.passwordLoading ? <Spinner /> : 'Create Account'}
                  </ActionButton>
                </ButtonContainer>
              </>
            )}
          </ContentPane>
        </AccountCreationPaneElement>
      ) : (
        <></>
      )}
    </AccountCreationContainer>
  );
};

export default AccountCreationModal;
