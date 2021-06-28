import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { MenuActions, MenuState, MenuType } from './reducer';

export function useMenuControl() {
  const state = useSelector((state: GlobalState) => state.menu);
  const dispatch = useDispatch();
  return new MenuControl(state, dispatch);
}

export class MenuControl {
  state: MenuState;
  dispatch: Dispatch<any>;

  constructor(state: MenuState, dispatch: Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  OPEN_MENU(menuType: MenuType) {
    this.dispatch({ type: MenuActions.OPEN_MENU, payload: { menuType } });
  }
  CLOSE_ALL() {
    this.dispatch({ type: MenuActions.CLOSE_ALL });
  }
  SWITCH_MENU(menuType: MenuType) {
    this.dispatch({ type: MenuActions.SWITCH_MENU, payload: { menuType } });
  }
}
