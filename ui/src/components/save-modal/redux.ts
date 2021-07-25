import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { Executor, init, ReduxAction } from '../../redux/class';

export const useSaveModalState = () => useSelector((state: GlobalState) => state.SaveModal);

export namespace SaveModal {
  export interface SHAPE {
    open: boolean;
  }
  export const INITIAL_STATE: SHAPE = {
    open: false,
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace OPEN {
    export const meta = init((state: SHAPE, action) => ({ ...state, open: true }));
  }
  export namespace CLOSE {
    export const meta = init((state: SHAPE, action) => ({ ...state, open: false }));
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case OPEN.meta.type:            return OPEN.meta.logic(state, action);
      case CLOSE.meta.type:           return CLOSE.meta.logic(state, action);
      default:                        return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    OPEN = () => this.exec(OPEN.meta.createAction());
    CLOSE = () => this.exec(CLOSE.meta.createAction());
  }
}
