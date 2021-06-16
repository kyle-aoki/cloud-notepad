import { MenuActions } from '.';

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
    menu: MenuType;
  };
}
