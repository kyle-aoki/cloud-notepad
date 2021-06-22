import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { CurrentUserActions, CurrentUserState } from './reducer';

export const useCurrentUserControl = () => {
  const state = useSelector((state: GlobalState) => state.currentUser);
  const dispatch = useDispatch();
  return new CurrentUserControl(state, dispatch);
};

export class CurrentUserControl {
  state: CurrentUserState;
  dispatch: Dispatch<any>;
  constructor(state: CurrentUserState, dispatch: Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  SET_CURRENT_USER(newUserUsername: string) {
    this.dispatch({ type: CurrentUserActions.SET_CURRENT_USER, payload: { newUserUsername } });
  }

  UNSET_CURRENT_USER() {
    this.dispatch({ type: CurrentUserActions.UNSET_CURRENT_USER });
  }
}
