import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from '../components/menu-container';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeperator } from '../components/dropdown';
import MenuItem from '../components/menu-item';
import { LoggedInAs, UsernameDisplay } from '../../../../ui/username-font';
import { useDispatch } from 'react-redux';
import { useAccountState } from './redux';
import { Menu } from '../redux/redux';
import { Account } from './redux';
import { useFileSystemState } from '../../../file-system/redux';


const AccountComponent: any = () => {
  const AccountController = new Account.Instance(useDispatch());
  const { isLoggedIn, username } = useAccountState();
  const { fileSaveState } = useFileSystemState();

  return (
    <>
      <MenuItem menuName={"Account"} isLoggedIn={isLoggedIn} menuType={Menu.Type.account} offset={'0px'}>
        {isLoggedIn ? (
          <>
            <DropdownMenuItem unhoverable={true}>
              <LoggedInAs username={username} />
            </DropdownMenuItem>
            <DropdownMenuSeperator />
            <DropdownMenuItem onClick={() => AccountController.LOG_OUT(fileSaveState)}>Log Out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => AccountController.CREATE_ACCOUNT()}>Create Account</DropdownMenuItem>
            <DropdownMenuItem onClick={() => AccountController.LOG_IN()}>Log In</DropdownMenuItem>
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
