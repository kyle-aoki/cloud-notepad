import React, { FC } from 'react';
import styled from 'styled-components';
import { XButton, XButtonSVGContainer } from '../file-system/file-system';
import { useAccountCreationState } from './use-account-creation-state';
import { useCreateAccount } from './use-create-account';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { useDispatch } from 'react-redux';
import { CreateAccountModalActions } from '../../redux/reducers/create-account/reducer';

interface AccountCreationPaneProps {}

const AccountCreationModal: FC<AccountCreationPaneProps> = ({}) => {
  const [
    state,
    handleInputChange,
    handleNextClick,
    handleBackArrowClick,
    triggerAccountCreation,
    resetAccountCreationBoolean,
    resetAccountCreationState,
  ] = useAccountCreationState();

  const dispatch = useDispatch();

  useCreateAccount(state, dispatch, resetAccountCreationBoolean);

  const handleXButtonClick = () => {
    dispatch({ type: CreateAccountModalActions.CLOSE_CREATE_ACCOUNT_MODAL });
    resetAccountCreationState();
  };

  console.log(state.username);

  return (
    <>
      <OpaqueScreen />
      <AccountCreationPaneElement>
        <AccountCreationTaskbar>
          <CloudNotepadTitle>☁️ Cloud Notepad</CloudNotepadTitle>
          <XButton onClick={handleXButtonClick}>
            <XButtonSVGContainer />
          </XButton>
        </AccountCreationTaskbar>
        <ContentPane>
          {state.screen === 'USERNAME_INPUT' ? (
            <>
              <CreateAccountTitle>Create Account</CreateAccountTitle>

              <UsernameInput id="username" value={state.username} onChange={handleInputChange} />

              <Spacer />
              <ButtonContainer>
                <CreateAccountButton clicked={false} onClick={handleNextClick}>
                  Next
                </CreateAccountButton>
              </ButtonContainer>
            </>
          ) : (
            <>
              <CreateAccountTitle>Select Password</CreateAccountTitle>
              <ArrowContainer>
                <ArrowButton className="ArrowContainer" onClick={handleBackArrowClick}>
                  <LeftArrow className="Arrow" />
                </ArrowButton>
                {state.username}
              </ArrowContainer>
              <PasswordInput id="password" value={state.password} onChange={handleInputChange} />

              <ButtonContainer>
                <CreateAccountButton clicked={false} onClick={triggerAccountCreation}>
                  Create Account
                </CreateAccountButton>
              </ButtonContainer>
            </>
          )}
        </ContentPane>
      </AccountCreationPaneElement>
    </>
  );
};

export default AccountCreationModal;

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
  &:hover {
    background-color: ${(props) => (props.clicked ? 'gray' : '#0065b3')};
  }
  &:active {
    transform: ${(props) => (props.clicked ? 'scale(1.0)' : 'scale(0.975)')};
  }
`;

const CreateAccountButton = styled(Button)`
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
