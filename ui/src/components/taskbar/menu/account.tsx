import React, { FC } from 'react';
import styled from 'styled-components';
import MenuContainer from './components/menu-container';
import { ReactComponent as DownChevron } from '../../../assets/down-chevron.svg';
import { DropdownMenu } from './components/dropdown';

const AccountContainer = styled(MenuContainer)`
  margin-left: auto;
  padding: 0 10px;
`;

const AccountDropDown = styled(DropdownMenu)``;

const AccountDownChevron: FC = () => (
  <DownChevron width="8px" style={{ marginLeft: '5px', marginTop: '2px' }} />
);

const Account: any = () => {
  return (
    <AccountContainer>
      Account
      <AccountDownChevron />
    </AccountContainer>
  );
};

export default Account;
