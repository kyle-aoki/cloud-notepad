import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from './components/menu-container';
import { ReactComponent as DownChevron } from '../../../assets/down-chevron.svg';
import { DropdownMenu } from './components/dropdown';
import { useAccountCreationControl } from '../../../redux/reducers/create-account/control';
import { useAccountDropdownControl } from '../../../redux/reducers/account/control';

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
`;

const AccountDownChevron: FC = () => <DownChevron width="8px" height="8px" style={{ marginLeft: '5px', marginTop: '2px' }} />;

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

const Account: any = () => {
  const AccountDropdownControl = useAccountDropdownControl();
  const AccountCreationControl = useAccountCreationControl();

  const handleAccountClick = () => {
    AccountDropdownControl.TOGGLE_ACCOUNT_DROPDOWN();
  };

  const handleCreateAccountButtonClick = () => {
    AccountDropdownControl.TOGGLE_ACCOUNT_DROPDOWN();
    AccountCreationControl.OPEN_MODAL();
  };

  return (
    <>
      <AccountContainer onClick={handleAccountClick}>
        Account
        <AccountDownChevron />
      </AccountContainer>
      {AccountDropdownControl.state.accountMenuOpen && (
        <AccountDropDown>
          <AccountMenuButton>Log In</AccountMenuButton>
          <AccountMenuButton onClick={handleCreateAccountButtonClick}>Create Account</AccountMenuButton>
        </AccountDropDown>
      )}
    </>
  );
};

export default Account;
