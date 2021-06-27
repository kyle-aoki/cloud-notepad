import React, { FC } from 'react';
import styled from 'styled-components';
import { XButtonSVGContainer } from '../file-system/file-system';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { AccountCreationScreen } from '../../redux/reducers/create-account/reducer';
import { useAccountCreationControl } from '../../redux/reducers/create-account/control';
import { useNotificationControl } from '../../redux/reducers/notifications/control';
import useAccountCreationNotifs from './use-account-creation-notifs';
import { XButton } from '../file-system/styled-components';
import { useSetUserOnAccountCreation } from './use-set-user-on-acc-creation';
import useCloseModalOnDone from './use-close-modal-on-done';
import { useAccountControl } from '../../redux/reducers/account/control';

interface AccountCreationPaneProps {}

const AccountCreationModal: FC<AccountCreationPaneProps> = ({}) => {
  const AccountCreationControl = useAccountCreationControl();
  const NotificationControl = useNotificationControl();
  const AccountControl = useAccountControl();

  useSetUserOnAccountCreation(AccountControl, AccountCreationControl);
  useAccountCreationNotifs(AccountCreationControl, NotificationControl);
  useCloseModalOnDone(AccountCreationControl);

  return (
    <AccountCreationContainer className={AccountCreationControl.state.createAccountModalOpen ? 'Show' : 'Hidden'}>
      {AccountCreationControl.state.createAccountModalOpen ? (
        <AccountCreationPaneElement>
          <AccountCreationTaskbar>
            <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
            <XButton onClick={() => AccountCreationControl.CLOSE_MODAL()}>
              <XButtonSVGContainer />
            </XButton>
          </AccountCreationTaskbar>
          <ContentPane>
            {AccountCreationControl.state.accountCreationScreen === AccountCreationScreen.USERNAME_INPUT ? (
              <>
                <CreateAccountTitle>Create Account</CreateAccountTitle>

                <UsernameInput
                  id="username"
                  value={AccountCreationControl.state.username}
                  onChange={(e) => AccountCreationControl.UPDATE_INPUT(e.target.id, e.target.value)}
                />

                <Spacer />
                <ButtonContainer>
                  <ActionButton
                    clicked={AccountCreationControl.state.usernameLoading}
                    onClick={() => AccountCreationControl.CHECK_USERNAME()}
                  >
                    {AccountCreationControl.state.usernameLoading ? <Spinner /> : 'Next'}
                  </ActionButton>
                </ButtonContainer>
              </>
            ) : (
              <>
                <CreateAccountTitle>Select Password</CreateAccountTitle>
                <ArrowContainer>
                  <ArrowButton
                    className="ArrowContainer"
                    onClick={() => AccountCreationControl.GO_BACK_TO_USERNAME_SCREEN()}
                  >
                    <LeftArrow className="Arrow" />
                  </ArrowButton>
                  {AccountCreationControl.state.username}
                </ArrowContainer>
                <PasswordInput
                  id="password"
                  value={AccountCreationControl.state.password}
                  onChange={(e) => AccountCreationControl.UPDATE_INPUT(e.target.id, e.target.value)}
                />

                <ButtonContainer>
                  <ActionButton clicked={false} onClick={() => AccountCreationControl.TRIGGER_ACCOUNT_CREATION()}>
                    {AccountCreationControl.state.passwordLoading ? <Spinner /> : 'Create Account'}
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

export const Spinner: FC = () => {
  return <div className="spinner-border" />;
};

export const AccountCreationContainer = styled.div`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #e3f2ff;
  transition: opacity 0.2s ease-in-out;
`;

export const AccountCreationPaneElement = styled.div`
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  z-index: 100;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: #fff;
  color: black;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 270px;
`;

const Spacer = styled.div`
  width: 100%;
  height: 20px;
`;

export const AccountCreationTaskbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: #0078d7;
  color: white;
`;

export const ContentPane = styled.div`
  height: 100%;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
`;

export const Input = styled.input.attrs((props) => ({
  spellCheck: false,
}))`
  background-color: inherit;
  color: black;
  outline: none;
  width: 300px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid;
  border-color: #bdbdbd;
  width: 100%;
`;

const UsernameInput = styled(Input).attrs((props) => ({
  placeholder: 'username',
}))``;
const PasswordInput = styled(Input).attrs((props) => ({
  placeholder: 'password',
  type: 'password',
}))``;

export const Button = styled.div<any>`
  padding: 0 50px;
  height: 32px;
  background-color: ${(props) => (props.clicked ? 'gray' : '#0078D7')};
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
  user-select: none;
  min-width: 210px;
  &:hover {
    background-color: ${(props) => (props.clicked ? 'gray' : '#0065b3')};
  }
  &:active {
    transform: ${(props) => (props.clicked ? 'scale(1.0)' : 'scale(0.975)')};
  }
`;

const ActionButton = styled(Button)`
  margin-left: auto;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
`;

const CreateAccountTitle = styled.div`
  font-size: 20px;
`;

export const CloudNotepadTitle = styled.div`
  font-size: 14px;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.div`
  color: black;
  user-select: none;
  cursor: default;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
