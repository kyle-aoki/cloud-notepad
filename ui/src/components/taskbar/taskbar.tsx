import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '../..';
import AccountComponent from './menu/account';
import { useAccountState } from './menu/account/redux';
import Edit from './menu/edit';
import File from './menu/file';
import Format from './menu/format';
import Help from './menu/help';
import View from './menu/view';
import { Menu, useMenuState } from './menu/redux/redux';

interface TaskbarProps {}

const TaskbarContainer = styled.div`
  height: 19px;
  display: flex;
  align-items: center;
  background-color: #35363a;
  border-bottom: var(--border);
  z-index: 10;
  user-select: none;
`;

const ClickOff = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Taskbar: FC<TaskbarProps> = () => {
  const MenuControl = new Menu.Instance(useDispatch());
  const { isLoggedIn } = useAccountState();
  const MenuState = useMenuState();

  const open = Object.keys(MenuState).filter((key: string) => MenuState[key] === true).length > 0;

  return (
    <>
      {open && <ClickOff onClick={() => MenuControl.CLOSE_ALL()} />}
      <TaskbarContainer>
        <AccountComponent />
        {isLoggedIn && (
          <>
            <File />
            <Edit />
            <Format />
            <View />
            <Help />
          </>
        )}
      </TaskbarContainer>
    </>
  );
};

export default Taskbar;
