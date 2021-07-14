import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownMenu } from './dropdown';
import MenuContainer from './menu-container';
import { GlobalState } from '../../../..';
import { Menu, useMenuState } from '../../redux';
import { ReactComponent as DownChevron } from '../../../../assets/down-chevron.svg';
import styled from 'styled-components';

interface MenuItemProps {
  menuName: any;
  offset: string;
  menuType: Menu.Type;
  isLoggedIn?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ children, menuName, isLoggedIn, offset, menuType }) => {
  const MenuController = new Menu.Instance(useDispatch());
  const MenuState = useMenuState();
  const isSelected = MenuState[menuType];

  if (menuName === 'Account') {
    if (isLoggedIn) {
      menuName = <DownChevron width={8} />;
    } else {
      menuName = (
        <AccountMenuNameContainer>
          <AccountMenuName>Account</AccountMenuName>
          <DownChevron width={8} height={8} />
        </AccountMenuNameContainer>
      );
    }
  }

  return (
    <>
      <MenuContainer
        isSelected={isSelected}
        onClick={() => MenuController.OPEN(menuType)}
        onMouseOver={() => MenuController.SWITCH(menuType)}
      >
        {menuName === 'down-chev' ? <DownChevron width={8} /> : menuName}
      </MenuContainer>
      {isSelected && <DropdownMenu offset={offset}>{children}</DropdownMenu>}
    </>
  );
};

export default MenuItem;

const AccountMenuNameContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const AccountMenuName = styled.div``;
