import { useSelector } from "react-redux";
import { GlobalState } from "../..";
import { Executor, init, ReduxAction } from "../../redux/class";

// export const useBASEState = () => useSelector((state: GlobalState) => state.BASE);

export namespace BASE {
  export interface SHAPE {
  }
  export const INITIAL_STATE: SHAPE = {
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      default:                        return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
  }
}