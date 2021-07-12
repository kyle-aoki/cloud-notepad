import { useSelector } from 'react-redux';
import { init, ReduxAction, Executor } from '../redux/class';
import { GlobalState } from '..';

export const useNotifState = () => useSelector((state: GlobalState) => state.Notif);

export namespace Notif {
  export enum Type {
    INFO,
    ERROR,
  }
  export interface SHAPE {
    count: number;
    type: Type;
    text: string;
  }
  export const INITIAL_STATE: SHAPE = {
    count: 0,
    type: Type.INFO,
    text: '',
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace PUSH_ERROR {
    export const meta = init((state: SHAPE, action) => {
      state.count += 1;
      state.text = action.payload.text;
      state.type = Type.ERROR;
      return { ...state };
    });
  }

  export namespace PUSH_INFO {
    export const meta = init((state: SHAPE, action) => {
      state.count += 1;
      state.text = action.payload.text;
      state.type = Type.INFO;
      return { ...state };
    });
  }

  export namespace NETWORK_ERROR {
    export const meta = init((state: SHAPE, action) => {
      state.count += 1;
      state.text = 'Network Error.';
      state.type = Type.ERROR;
      return { ...state };
    });
  }

  export namespace GENERIC_ERROR {
    export const meta = init((state: SHAPE, action) => {
      state.count += 1;
      state.text = 'Something went wrong.';
      state.type = Type.ERROR;
      return { ...state };
    });
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case PUSH_ERROR.meta.type:      return PUSH_ERROR.meta.logic(state, action);
      case PUSH_INFO.meta.type:       return PUSH_INFO.meta.logic(state, action);
      case NETWORK_ERROR.meta.type:   return NETWORK_ERROR.meta.logic(state, action);
      case GENERIC_ERROR.meta.type:   return GENERIC_ERROR.meta.logic(state, action);
      default:                        return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    PUSH_ERROR = (text: any) => this.exec(PUSH_ERROR.meta.createAction({ text }));
    PUSH_INFO = (text: any) => this.exec(PUSH_INFO.meta.createAction({ text }));
    NETWORK_ERROR = () => this.exec(NETWORK_ERROR.meta.createAction());
    GENERIC_ERROR = () => this.exec(GENERIC_ERROR.meta.createAction());
  }
}
