import { Reducer } from 'redux';
import { CLOSE_ALL, OPEN, SWITCH } from './functions';

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
export enum MenuType {
  file = 'file',
  edit = 'edit',
  format = 'format',
  view = 'view',
  help = 'help',
}

export interface MenuAction {
  type: MenuActions;
  payload?: {
    menuType: MenuType;
  };
}

export enum MenuActions {
  OPEN_MENU = 'OPEN_MENU',
  CLOSE_ALL = 'CLOSE_ALL',
  SWITCH_MENU = 'SWITCH_MENU',
}

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
