import { MenuState, MenuAction, MenuType } from './reducer';

export const OPEN = (state: MenuState, action: MenuAction) => {
  if (!action.payload) return state;
  const menuType: MenuType = action.payload.menuType;
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
    state[action.payload.menuType] = true;
  }
  return { ...state };
};

const menuOpen = (state: MenuState) => {
  return Object.values(state).filter((value: boolean) => Boolean(value)).length > 0;
};

const closeAll = (state: MenuState) => {
  Object.keys(state).forEach((key: string) => (state[key] = false));
};
