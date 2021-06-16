import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuActions, MenuType } from "../../../../redux/reducers/menu";
import { DropdownMenu } from "./dropdown";
import MenuContainer from "./menu-container";
import { GlobalState } from "../../../..";

interface MenuItemProps {
  menuName: string;
  offset: string;
  menuType: MenuType;
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  menuName,
  offset,
  menuType,
}) => {
  const selected = useSelector((state: GlobalState) => state.menu[menuType]);
  const dispatch = useDispatch();

  const MenuItemActions = {
    OPEN_MENU: () =>
      dispatch({
        type: MenuActions.OPEN_MENU,
        payload: { menu: menuType },
      }),
    SWITCH_MENU: () =>
      dispatch({
        type: MenuActions.SWITCH_MENU,
        payload: { menu: menuType },
      }),
  };

  const handleHelpClick = () => MenuItemActions.OPEN_MENU();
  const handleHelpHover = () => MenuItemActions.SWITCH_MENU();

  return (
    <>
      <MenuContainer
        selected={selected}
        onClick={handleHelpClick}
        onMouseOver={handleHelpHover}
      >
        {menuName}
      </MenuContainer>
      {selected && <DropdownMenu offset={offset}>{children}</DropdownMenu>}
    </>
  );
};

export default MenuItem;
