import { useSelector } from 'react-redux';
import { GlobalState } from '../../../..';
import { init, ReduxAction, Executor } from '../../../../redux/class';

export const useAccountState = () => useSelector((state: GlobalState) => state.Account);

export namespace Account {
  export interface SHAPE {
    accountMenuOpen: boolean;
    username: string | null;
  }
  export const INITIAL_STATE: SHAPE = {
    accountMenuOpen: false,
    username: localStorage.getItem('username'),
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
      localStorage.setItem('username', username);
      state.username = username;
      state.accountMenuOpen = false;
      return { ...state };
    });
  }

  export namespace UNSET_USER {
    export const meta = init((state: SHAPE, action) => {
      state.username = '';
      localStorage.setItem('username', '');
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
