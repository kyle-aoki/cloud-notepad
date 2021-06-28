import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownMenu } from './dropdown';
import MenuContainer from './menu-container';
import { GlobalState } from '../../../..';
import { MenuType } from '../../redux/reducer';
import { useMenuControl } from '../../redux/control';

interface MenuItemProps {
  menuName: string;
  offset: string;
  menuType: MenuType;
}

const MenuItem: FC<MenuItemProps> = ({ children, menuName, offset, menuType }) => {
  const MenuControl = useMenuControl();
  const isSelected = MenuControl.state[menuType];

  return (
    <>
      <MenuContainer
        isSelected={isSelected}
        onClick={() => MenuControl.OPEN_MENU(menuType)}
        onMouseOver={() => MenuControl.SWITCH_MENU(menuType)}
      >
        {menuName}
      </MenuContainer>
      {isSelected && <DropdownMenu offset={offset}>{children}</DropdownMenu>}
    </>
  );
};

export default MenuItem;
