import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { XButton, XButtonSVGContainer } from '../file-system/file-system';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { AccountCreationScreen } from '../../redux/reducers/create-account/reducer';
import { useAccountCreationControl } from '../../redux/reducers/create-account/control';
import toast, { Toaster } from 'react-hot-toast';

interface AccountCreationPaneProps {}

const AccountCreationModal: FC<AccountCreationPaneProps> = ({}) => {
  const AccountCreationControl = useAccountCreationControl();
  useEffect(() => {
    if (!AccountCreationControl.state.badUsername) return;
    toast.error(AccountCreationControl.state.badUsernameReason, {
      duration: 4000,
      position: 'top-right',
      // Styling
      style: {
        whiteSpace: 'pre-line',
      },
      className: '',
    });
  }, [AccountCreationControl.state.badUsername]);

  return (
    <>
      <Toaster />
      <OpaqueScreen />
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={() => AccountCreationControl.CLOSE_MODAL()}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane>
          {AccountCreationControl.state.accountCreationScreen ===
          AccountCreationScreen.USERNAME_INPUT ? (
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
                  clicked={false}
                  onClick={() => AccountCreationControl.CHECK_USERNAME()}
                  // onClick={notify}
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
                <ActionButton
                  clicked={false}
                  onClick={() => AccountCreationControl.TRIGGER_ACCOUNT_CREATION()}
                >
                  Create Account
                </ActionButton>
              </ButtonContainer>
            </>
          )}
        </ContentPane>
      </AccountCreationPaneElement>
    </>
  );
};

export default AccountCreationModal;

export const Spinner: FC = () => {
  return <div className="spinner-border" />;
};

const OpaqueScreen = styled.div`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.75;
  background-color: #0c0c0c;
`;

const AccountCreationPaneElement = styled.div`
  z-index: 100;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: #35363a;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 500px;
  height: 270px;
`;

const Spacer = styled.div`
  width: 100%;
  height: 20px;
`;

const AccountCreationTaskbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  margin-bottom: 20px;
  background-color: #0078d7;
`;

const ContentPane = styled.div`
  height: 100%;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
`;

const Input = styled.input.attrs((props) => ({
  spellCheck: false,
}))`
  background-color: inherit;
  color: white;
  outline: none;
  width: 300px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid;
  border-color: #e4e4e4;
  width: 100%;
`;

const UsernameInput = styled(Input).attrs((props) => ({
  placeholder: 'username',
}))``;
const PasswordInput = styled(Input).attrs((props) => ({
  placeholder: 'password',
  type: 'password',
}))``;

const Button = styled.div<any>`
  /* width: 115px; */
  padding: 0 50px;
  height: 32px;
  background-color: ${(props) => (props.clicked ? 'gray' : '#0078D7')};
  display: grid;
  place-items: center;
  cursor: pointer;
  user-select: none;
  min-width: 150px;
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

const CloudNotepadTitle = styled.div`
  font-size: 14px;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowButton = styled.div`
  user-select: none;
  cursor: default;
  /* width: 45px; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
