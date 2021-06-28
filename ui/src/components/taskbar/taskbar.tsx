import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '../..';
import { useAccountState } from './menu/account/redux/control';
import { useMenuControl } from './redux/control';
import Account from './menu/account';
import Edit from './menu/edit';
import File from './menu/file';
import Format from './menu/format';
import Help from './menu/help';
import View from './menu/view';

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
  const MenuControl = useMenuControl();

  const open = Object.keys(MenuControl.state).filter((key: string) => MenuControl.state[key] === true).length > 0;

  return (
    <>
      {open && <ClickOff onClick={() => MenuControl.CLOSE_ALL()} />}
      <TaskbarContainer>
        <Account />
        <File />
        <Edit />
        <Format />
        <View />
        <Help />
      </TaskbarContainer>
    </>
  );
};

export default Taskbar;
