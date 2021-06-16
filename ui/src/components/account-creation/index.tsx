import React, { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as XButtonSVG } from '../../assets/cancel.svg';
import { XButton, XButtonSVGContainer } from '../file-system/file-system';

interface AccountCreationPaneProps {}

const AccountCreationPane: FC<AccountCreationPaneProps> = ({}) => {
  return (
    <AccountCreationPaneElement>
      <AccountCreationTaskbar>
        <Title>Create An Account</Title>
        <XButton>
          <XButtonSVGContainer />
        </XButton>
      </AccountCreationTaskbar>
      <ContentPane>
        <UsernameInput />
        <PasswordInput />
        <CreateAccountButton>Create Account</CreateAccountButton>
      </ContentPane>
    </AccountCreationPaneElement>
  );
};

export default AccountCreationPane;

const AccountCreationPaneElement = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: #35363a;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AccountCreationTaskbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  background-color: #2747ca;
`;

const Title = styled.div`
  font-family: 'Consolas';
  font-size: 14px;
`;

const ContentPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 100px;
`;

const Input = styled.input.attrs((props) => ({
  spellCheck: false,
}))`
  outline: none;
  width: 300px;
  height: 40px;
  font-size: 20px;
  border: none;
  font-family: 'Consolas';
  background-color: #dadada;
  padding-left: 15px;
`;

const UsernameInput = styled(Input).attrs((props) => ({
  placeholder: 'username',
}))``;
const PasswordInput = styled(Input).attrs((props) => ({
  placeholder: 'password',
  type: 'password',
}))``;

const Button = styled.div`
  width: 200px;
  height: 50px;
  background-color: #3232db;
  border-radius: 4px;
  display: grid;
  place-items: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid;
  border-color: #6161df;
  font-family: 'Consolas';
  &:hover {
    filter: brightness(1.05);
    border-color: #8c8ce6;
  }
  &:active {
    filter: brightness(0.95);
  }
`;

const CreateAccountButton = styled(Button)``;
