import { Reducer } from 'redux';
import { CLOSE_ALL, MenuAction, MenuActions, OPEN, SWITCH } from '.';

export interface MenuState {
  [file: string]: boolean;
  edit: boolean;
  format: boolean;
  view: boolean;
  help: boolean;
}

const initialState: MenuState = {
  file: false,
  edit: false,
  format: false,
  view: false,
  help: false,
};

export const menuReducer: Reducer<MenuState, MenuAction> = (state = initialState, action) => {
  switch (action.type) {
    case MenuActions.CLOSE_ALL:
      return CLOSE_ALL(state);
    case MenuActions.OPEN_MENU:
      return OPEN(state, action);
    case MenuActions.SWITCH_MENU:
      return SWITCH(state, action);
  }
  return state;
};
