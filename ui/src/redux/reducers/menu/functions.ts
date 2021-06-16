import { MenuState } from '.';
import { MenuAction, MenuType } from './types';

export const OPEN = (state: MenuState, action: MenuAction) => {
  if (!action.payload) return state;
  const menuType: MenuType = action.payload.menu;
  state[menuType] = !state[menuType];
  return { ...state };
};

export const CLOSE_ALL = (state: MenuState) => {
  for (let key of Object.keys(state)) {
    state[key] = false;
  }
  return { ...state };
};

export const SWITCH = (state: MenuState, action: MenuAction) => {
  if (!action.payload) return state;
  if (menuOpen(state)) {
    closeAll(state);
    state[action.payload.menu] = true;
  }
  return { ...state };
};

const menuOpen = (state: MenuState) => {
  return Object.values(state).filter((value: boolean) => Boolean(value)).length > 0;
};

const closeAll = (state: MenuState) => {
  Object.keys(state).forEach((key: string) => (state[key] = false));
};
