import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '../..';
import { MenuActions } from '../../redux/reducers/menu';
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
  const menu = useSelector((state: GlobalState) => state.menu);
  const dispatch = useDispatch();
  const TaskbarActions = {
    CLOSE_ALL: () => dispatch({ type: MenuActions.CLOSE_ALL }),
  };

  const handleClickOff = () => TaskbarActions.CLOSE_ALL();

  const open = Object.keys(menu).filter((key: string) => menu[key] === true).length > 0;

  return (
    <>
      {open && <ClickOff onClick={handleClickOff} />}
      <TaskbarContainer>
        <File />
        {/* <Edit /> */}
        {/* <Format /> */}
        {/* <View /> */}
        {/* <Help /> */}
        <Account />
      </TaskbarContainer>
    </>
  );
};

export default Taskbar;
