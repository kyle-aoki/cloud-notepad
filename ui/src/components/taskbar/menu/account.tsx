import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from './components/menu-container';
import { ReactComponent as DownChevron } from '../../../assets/down-chevron.svg';
import { DropdownMenu } from './components/dropdown';
import { useAccountCreationControl } from '../../../redux/reducers/create-account/control';
import { useAccountControl, useAccountState } from '../../../redux/reducers/account/control';
import { useLogInControl } from '../../../redux/reducers/log-in/control';

const AccountContainer = styled(MenuContainer)`
  margin-left: auto;
  padding: 0 10px;
`;

const AccountDropDown = styled.div`
  // From Dropdown
  user-select: none;
  cursor: default;
  position: absolute;
  top: 19px;
  right: 0px;
  border: 1px solid #4b4c4f;
  background-color: #292a2d;
  border-radius: 1px;
  padding: 30px;
  // From Dropdown

  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
`;

const AccountDownChevron: FC = () => (
  <DownChevron width="8px" height="8px" style={{ marginLeft: '5px', marginTop: '2px' }} />
);

const AccountMenuButton = styled.div`
  display: grid;
  place-items: center;
  background-color: var(--blue);
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: var(--blueHovered);
  }
  &:active {
    transform: var(--bluePressed);
  }
`;

const LoggedInAccountDropDown = styled.div`
  // From Dropdown
  user-select: none;
  cursor: default;
  position: absolute;
  top: 19px;
  right: 0px;
  border: 1px solid #4b4c4f;
  background-color: #292a2d;
  border-radius: 1px;
  padding: 30px;
  // From Dropdown

  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
`;

const LoggedInAsContainer = styled.div`
  font-family: 'Consolas';
`;

const Account: any = () => {
  const AccountState = useAccountState();
  const AccountControl = useAccountControl();
  const AccountCreationControl = useAccountCreationControl();
  const LogInControl = useLogInControl();

  const handleAccountClick = () => {
    AccountControl.TOGGLE_ACCOUNT_DROPDOWN();
  };

  const handleCreateAccountButtonClick = () => {
    AccountControl.TOGGLE_ACCOUNT_DROPDOWN();
    AccountCreationControl.OPEN_MODAL();
  };

  const handleLogInClick = () => {
    LogInControl.TOGGLE_LOG_IN_MODAL();
    AccountControl.TOGGLE_ACCOUNT_DROPDOWN();
  };

  const handleLogOutClick = () => {
    AccountControl.UNSET_USER();
  };

  return (
    <>
      <AccountContainer onClick={handleAccountClick}>
        Account
        <AccountDownChevron />
      </AccountContainer>
      {AccountState.accountMenuOpen &&
        (AccountState.username ? (
          <LoggedInAccountDropDown>
            <LoggedInAsContainer>{AccountState.username}</LoggedInAsContainer>
            <AccountMenuButton onClick={handleLogOutClick}>Log Out</AccountMenuButton>
          </LoggedInAccountDropDown>
        ) : (
          <AccountDropDown>
            <AccountMenuButton onClick={handleLogInClick}>Log In</AccountMenuButton>
            <AccountMenuButton onClick={handleCreateAccountButtonClick}>Create Account</AccountMenuButton>
          </AccountDropDown>
        ))}
    </>
  );
};

export default Account;
