import { useSelector } from 'react-redux';
import { GlobalState } from '../../../..';
import { init, ReduxAction, Executor } from '../../../../redux/class';
import {
  getUsernameFromLocalStorage,
  checkIfUsernameExistsInLocalStorage,
  setUsernameInLocalStorage,
  deleteUsernameFromLocalStorage,
} from './util';

export const useAccountState = () => useSelector((state: GlobalState) => state.Account);

export namespace Account {
  export interface SHAPE {
    accountMenuOpen: boolean;
    username: string;
    isLoggedIn: boolean;
  }
  export const INITIAL_STATE: SHAPE = {
    accountMenuOpen: false,
    username: getUsernameFromLocalStorage(),
    isLoggedIn: checkIfUsernameExistsInLocalStorage(),
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace TOGGLE_ACCOUNT_DROPDOWN {
    export const meta = init((state: SHAPE, action) => {
      state.accountMenuOpen = !state.accountMenuOpen;
      return { ...state };
    });
  }

  export namespace SET_USER {
    export const meta = init((state: SHAPE, action) => {
      const username = action.payload.username;

      setUsernameInLocalStorage(username);

      state.username = username;
      state.accountMenuOpen = false;
      state.isLoggedIn = checkIfUsernameExistsInLocalStorage();

      return { ...state };
    });
  }

  export namespace UNSET_USER {
    export const meta = init((state: SHAPE, action) => {
      state.username = '';

      deleteUsernameFromLocalStorage();
      state.isLoggedIn = checkIfUsernameExistsInLocalStorage();
      
      return { ...state };
    });
  }

  export namespace SAGA {
    export namespace CREATE_ACCOUNT {
      export const meta = init((state: SHAPE, action) => ({ ...state }));
    }
    export namespace LOG_IN {
      export const meta = init((state: SHAPE, action) => ({ ...state }));
    }
    export namespace LOG_OUT {
      export const meta = init((state: SHAPE, action) => ({ ...state }));
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
      switch (action.type) {
        case TOGGLE_ACCOUNT_DROPDOWN.meta.type:     return TOGGLE_ACCOUNT_DROPDOWN.meta.logic(state, action);
        case SET_USER.meta.type:                    return SET_USER.meta.logic(state, action);
        case UNSET_USER.meta.type:                  return UNSET_USER.meta.logic(state, action);
        default:                                    return DEFAULT.meta.logic(state, action);
      }
    }

  export class Instance extends Executor {
    TOGGLE_ACCOUNT_DROPDOWN = () => this.exec(TOGGLE_ACCOUNT_DROPDOWN.meta.createAction());
    SET_USER = (username: string) => this.exec(SET_USER.meta.createAction({ username }));
    UNSET_USER = () => this.exec(UNSET_USER.meta.createAction());

    CREATE_ACCOUNT = () => this.exec(SAGA.CREATE_ACCOUNT.meta.createAction());
    LOG_IN = () => this.exec(SAGA.LOG_IN.meta.createAction());
    LOG_OUT = () => this.exec(SAGA.LOG_OUT.meta.createAction());
  }
}
