import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { init, ReduxAction, Executor } from '../../redux/class';

export const useAccountCreationState = () => useSelector((state: GlobalState) => state.AccountCreation);

export namespace AccountCreation {
  export enum Screen {
    USERNAME_INPUT,
    PASSWORD_INPUT,
  }
  export interface SHAPE {
    [x: string]: any;
    done: boolean;
    createAccountModalOpen: boolean;
    usernameLoading: boolean;
    passwordLoading: boolean;

    createAccountAttempt: number;
    accountCreateFailiure: boolean;

    username: string;
    password: string;
    accountCreationScreen: Screen;

    newUserUsername: string;
  }
  export const INITIAL_STATE: SHAPE = {
    done: false,
    createAccountModalOpen: false,
    usernameLoading: false,
    passwordLoading: false,

    createAccountAttempt: 0,
    accountCreatedSuccess: false,
    accountCreateFailiure: false,
    username: '',
    password: '',
    accountCreationScreen: Screen.USERNAME_INPUT,

    newUserUsername: '',
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace OPEN_MODAL {
    export const meta = init((state: SHAPE, action) => {
      return { ...INITIAL_STATE, createAccountModalOpen: true };
    });
  }

  export namespace CLOSE_MODAL {
    export const meta = init((state: SHAPE, action) => {
      state.password = '';
      state.createAccountModalOpen = false;
      return { ...state };
    });
  }

  export namespace USERNAME_LOADING {
    export const meta = init((state: SHAPE, action) => {
      state.usernameLoading = true;
      return { ...state };
    });
  }

  export namespace PASSWORD_LOADING {
    export const meta = init((state: SHAPE, action) => {
      state.usernameLoading = false;
      state.passwordLoading = true;
      return { ...state };
    });
  }

  export namespace STOP_PASSWORD_LOADING {
    export const meta = init((state: SHAPE, action) => {
      state.usernameLoading = false;
      state.passwordLoading = false;
      return { ...state };
    });
  }

  export namespace UPDATE_INPUT {
    export const meta = init((state: SHAPE, action) => {
      const field = action.payload.field;
      const value = action.payload.value;

      state[field] = value;
      return { ...state };
    });
  }

  export namespace GO_TO_PASSWORD_SCREEN {
    export const meta = init((state: SHAPE, action) => {
      return {
        ...state,
        usernameLoading: false,
        accountCreationScreen: Screen.PASSWORD_INPUT,
      };
    });
  }

  export namespace GO_BACK_TO_USERNAME_SCREEN {
    export const meta = init((state: SHAPE, action) => {
      return {
        ...state,
        usernameLoading: false,
        accountCreationScreen: Screen.USERNAME_INPUT,
      };
    });
  }

  export namespace RESET_ACCOUNT_CREATION_STATE {
    export const meta = init((state: SHAPE, action) => {
      return INITIAL_STATE;
    });
  }

  export namespace STOP_USERNAME_LOADING {
    export const meta = init((state: SHAPE, action) => {
      return { ...state, usernameLoading: false };
    });
  }

  export namespace SAGA {
    export namespace CHECK_USERNAME {
      export const meta = init((state: SHAPE, action) => ({ ...state }));
    }
    export namespace CHECK_PASSWORD {
      export const meta = init((state: SHAPE, action) => ({ ...state }));
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
      switch (action.type) {
        case DEFAULT.meta.type:                         return DEFAULT.meta.logic(state, action);
        case OPEN_MODAL.meta.type:                      return OPEN_MODAL.meta.logic(state, action);
        case CLOSE_MODAL.meta.type:                     return CLOSE_MODAL.meta.logic(state, action);
        case USERNAME_LOADING.meta.type:                return USERNAME_LOADING.meta.logic(state, action);
        case PASSWORD_LOADING.meta.type:                return PASSWORD_LOADING.meta.logic(state, action);
        case STOP_PASSWORD_LOADING.meta.type:           return STOP_PASSWORD_LOADING.meta.logic(state, action);
        case UPDATE_INPUT.meta.type:                    return UPDATE_INPUT.meta.logic(state, action);
        case GO_TO_PASSWORD_SCREEN.meta.type:           return GO_TO_PASSWORD_SCREEN.meta.logic(state, action);
        case GO_BACK_TO_USERNAME_SCREEN.meta.type:      return GO_BACK_TO_USERNAME_SCREEN.meta.logic(state, action);
        case RESET_ACCOUNT_CREATION_STATE.meta.type:    return RESET_ACCOUNT_CREATION_STATE.meta.logic(state, action);
        case STOP_USERNAME_LOADING.meta.type:           return STOP_USERNAME_LOADING.meta.logic(state, action);
        default:                                        return DEFAULT.meta.logic(state, action);
      }
    }

  export class Instance extends Executor {
    DEFAULT = () => this.exec(DEFAULT.meta.createAction());
    OPEN_MODAL = () => this.exec(OPEN_MODAL.meta.createAction());
    CLOSE_MODAL = () => this.exec(CLOSE_MODAL.meta.createAction());
    USERNAME_LOADING = () => this.exec(USERNAME_LOADING.meta.createAction());
    PASSWORD_LOADING = () => this.exec(PASSWORD_LOADING.meta.createAction());
    STOP_PASSWORD_LOADING = () => this.exec(STOP_PASSWORD_LOADING.meta.createAction());
    UPDATE_INPUT = (field: string, value: string) => this.exec(UPDATE_INPUT.meta.createAction({ field, value }));
    GO_TO_PASSWORD_SCREEN = () => this.exec(GO_TO_PASSWORD_SCREEN.meta.createAction());
    GO_BACK_TO_USERNAME_SCREEN = () => this.exec(GO_BACK_TO_USERNAME_SCREEN.meta.createAction());
    RESET_ACCOUNT_CREATION_STATE = () => this.exec(RESET_ACCOUNT_CREATION_STATE.meta.createAction());
    STOP_USERNAME_LOADING = () => this.exec(STOP_USERNAME_LOADING.meta.createAction());

    CHECK_USERNAME = (username: string, usernameLoading: boolean) => {
      return this.exec(SAGA.CHECK_USERNAME.meta.createAction({ username, usernameLoading }));
    };
    CHECK_PASSWORD = (username: string, password: string, passwordLoading: boolean) => {
      return this.exec(SAGA.CHECK_PASSWORD.meta.createAction({ username, password, passwordLoading }));
    };
  }
}
