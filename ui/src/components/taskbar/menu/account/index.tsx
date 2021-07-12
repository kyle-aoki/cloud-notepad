import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from '../components/menu-container';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeperator } from '../components/dropdown';
import MenuItem from '../components/menu-item';
import { LoggedInAs, UsernameDisplay } from '../../../../ui/username-font';
import { useDispatch } from 'react-redux';
import { useAccountState } from './redux';
import { Menu } from '../../redux';
import { Account } from './redux';
import { AccountCreation } from '../../../account-creation/redux';
import { LogIn } from '../../../log-in/redux';

const AccountComponent: any = () => {
  const AccountController = new Account.Instance(useDispatch());
  const AccountState = useAccountState();

  const AccountCreationController = new AccountCreation.Instance(useDispatch());
  const LogInController = new LogIn.Instance(useDispatch());

  return (
    <>
      <MenuItem menuName="Account" menuType={Menu.Type.account} offset={'0px'}>
        {AccountState.username ? (
          <>
            <DropdownMenuItem unhoverable={true}>
              <LoggedInAs username={AccountState.username} />
            </DropdownMenuItem>
            <DropdownMenuSeperator />
            <DropdownMenuItem onClick={() => AccountController.UNSET_USER()}>Log Out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => AccountCreationController.OPEN_MODAL()}>Create Account</DropdownMenuItem>
            <DropdownMenuItem onClick={() => LogInController.TOGGLE_LOG_IN_MODAL()}>Log In</DropdownMenuItem>
          </>
        )}
      </MenuItem>
    </>
  );
};

export default AccountComponent;

const AccountContainer = styled(MenuContainer)`
  padding: 0 10px;
`;

const AccountDropDown = styled.div`
  // From Dropdown
  user-select: none;
  cursor: default;
  position: absolute;
  top: 19px;
  left: 0px;
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
  left: 0px;
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
