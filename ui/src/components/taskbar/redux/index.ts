import { useSelector } from 'react-redux';
import { GlobalState } from '../../..';
import { init, ReduxAction, Executor } from '../../../redux/class';
import { closeAll, menuOpen } from './util';

export const useMenuState = () => useSelector((state: GlobalState) => state.Menu);

export namespace Menu {
  export enum Type {
    account = 'account',
    file = 'file',
    edit = 'edit',
    format = 'format',
    view = 'view',
    help = 'help',
  }
  export interface SHAPE {
    [account: string]: boolean;
    file: boolean;
    edit: boolean;
    format: boolean;
    view: boolean;
    help: boolean;
  }
  export const INITIAL_STATE: SHAPE = {
    account: false,
    file: false,
    edit: false,
    format: false,
    view: false,
    help: false,
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace OPEN {
    export const meta = init((state: SHAPE, action) => {
      if (!action.payload) return state;
      const menuType: Type = action.payload.menuType;
      state[menuType] = !state[menuType];
      return { ...state };
    });
  }

  export namespace CLOSE_ALL {
    export const meta = init((state: SHAPE, action) => {
      for (let key of Object.keys(state)) {
        state[key] = false;
      }
      return { ...state };
    });
  }

  export namespace SWITCH {
    export const meta = init((state: SHAPE, action) => {
      if (!action.payload) return state;
      if (menuOpen(state)) {
        closeAll(state);
        state[action.payload.menuType] = true;
      }
      return { ...state };
    });
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case OPEN.meta.type:            return OPEN.meta.logic(state, action);
      case CLOSE_ALL.meta.type:       return CLOSE_ALL.meta.logic(state, action);
      case SWITCH.meta.type:          return SWITCH.meta.logic(state, action);
      default:                        return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    OPEN = (menuType: Type) => this.exec(OPEN.meta.createAction({ menuType }));
    CLOSE_ALL = () => this.exec(CLOSE_ALL.meta.createAction());
    SWITCH = (menuType: Type) => this.exec(SWITCH.meta.createAction({ menuType }));
  }
}
