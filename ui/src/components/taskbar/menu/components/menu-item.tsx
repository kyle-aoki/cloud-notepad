import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownMenu } from './dropdown';
import MenuContainer from './menu-container';
import { GlobalState } from '../../../..';
import { Menu, useMenuState } from '../../redux';

interface MenuItemProps {
  menuName: string;
  offset: string;
  menuType: Menu.Type;
}

const MenuItem: FC<MenuItemProps> = ({ children, menuName, offset, menuType }) => {
  const MenuController = new Menu.Instance(useDispatch());
  const MenuState = useMenuState();
  const isSelected = MenuState[menuType];

  return (
    <>
      <MenuContainer
        isSelected={isSelected}
        onClick={() => MenuController.OPEN(menuType)}
        onMouseOver={() => MenuController.SWITCH(menuType)}
      >
        {menuName}
      </MenuContainer>
      {isSelected && <DropdownMenu offset={offset}>{children}</DropdownMenu>}
    </>
  );
};

export default MenuItem;
