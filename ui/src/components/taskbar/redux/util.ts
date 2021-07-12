import { Menu } from './';

export const menuOpen = (state: Menu.SHAPE) => {
  return Object.values(state).filter((value: boolean) => Boolean(value)).length > 0;
};

export const closeAll = (state: Menu.SHAPE) => {
  Object.keys(state).forEach((key: string) => (state[key] = false));
};
