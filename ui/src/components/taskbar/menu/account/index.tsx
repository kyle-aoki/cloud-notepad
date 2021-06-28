import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from '../components/menu-container';
import { ReactComponent as DownChevron } from '../../../assets/down-chevron.svg';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeperator } from '../components/dropdown';
import { useAccountCreationControl } from '../../../account-creation/redux/control';
import { useAccountControl, useAccountState } from './redux/control';
import { useLogInControl } from '../../../log-in/redux/control';
import { MenuType } from '../../redux/reducer';
import MenuItem from '../components/menu-item';
import { LoggedInAs, UsernameDisplay } from '../../../../ui/username-font';
import { useMenuControl } from '../../redux/control';

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

const Account: any = () => {
  const AccountState = useAccountState();
  const AccountControl = useAccountControl();
  const AccountCreationControl = useAccountCreationControl();
  const LogInControl = useLogInControl();
  const MenuControl = useMenuControl();

  const handleCreateAccountButtonClick = () => {
    AccountCreationControl.OPEN_MODAL();
    MenuControl.CLOSE_ALL();
  };

  const handleLogInClick = () => {
    LogInControl.TOGGLE_LOG_IN_MODAL();
    MenuControl.CLOSE_ALL();
  };

  const handleLogOutClick = () => {
    AccountControl.UNSET_USER();
    MenuControl.CLOSE_ALL();
  };

  return (
    <>
      <MenuItem menuName="Account" menuType={MenuType.account} offset={'0px'}>
        {AccountState.username ? (
          <>
            <DropdownMenuItem unhoverable={true}>
              <LoggedInAs username={AccountState.username} />
            </DropdownMenuItem>
            <DropdownMenuSeperator />
            <DropdownMenuItem onClick={handleLogOutClick}>Log Out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={handleCreateAccountButtonClick}>Create Account</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogInClick}>Log In</DropdownMenuItem>
          </>
        )}
      </MenuItem>
    </>
  );
};

export default Account;
