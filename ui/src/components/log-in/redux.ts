import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { init, ReduxAction, Executor } from '../../redux/class';

export const useLogInState = () => useSelector((state: GlobalState) => state.LogIn);

export namespace LogIn {
  export interface SHAPE {
    loading: boolean;
    showLogInModal: boolean;
    username: string;
    password: string;
  }
  export const INITIAL_STATE: SHAPE = {
    loading: false,
    showLogInModal: false,
    username: '',
    password: '',
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace START_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, loading: true }));
  }

  export namespace STOP_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, loading: false }));
  }

  export namespace UPDATE_FIELD {
    export const meta = init((state: SHAPE, action) => {
      const field = action.payload.field;
      const value = action.payload.value;
      return { ...state, [field]: value };
    });
  }

  export namespace TOGGLE_LOG_IN_MODAL {
    export const meta = init((state: SHAPE, action) => {
      state.showLogInModal = !state.showLogInModal;
      return { ...state };
    });
  }

  export namespace SAGA {
    export namespace SUBMIT_LOG_IN {
      export const meta = init(() => {});
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case START_LOADING.meta.type:             return START_LOADING.meta.logic(state, action);
      case STOP_LOADING.meta.type:              return STOP_LOADING.meta.logic(state, action);
      case UPDATE_FIELD.meta.type:              return UPDATE_FIELD.meta.logic(state, action);
      case TOGGLE_LOG_IN_MODAL.meta.type:       return TOGGLE_LOG_IN_MODAL.meta.logic(state, action);
      default:                                  return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    START_LOADING = () => this.exec(START_LOADING.meta.createAction());
    STOP_LOADING = () => this.exec(STOP_LOADING.meta.createAction());
    UPDATE_FIELD = (field: string, value: string) => this.exec(UPDATE_FIELD.meta.createAction({ field, value }));
    TOGGLE_LOG_IN_MODAL = () => this.exec(TOGGLE_LOG_IN_MODAL.meta.createAction());

    SUBMIT_LOG_IN = (username: string, password: string, loading: boolean) => {
      return this.exec(SAGA.SUBMIT_LOG_IN.meta.createAction({ username, password, loading }));
    };
  }
}
