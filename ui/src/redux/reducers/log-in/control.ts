import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../..';
import { Dispatch } from 'redux';
import { LogInActions } from './reducer';

export const useLogInState = () => {
  const state = useSelector((state: GlobalState) => state.LogIn);
  return state;
};

export const useLogInControl = () => {
  const dispatch = useDispatch();
  return new LogInControl(dispatch);
};

export class LogInControl {
  dispatch: Dispatch<any>;
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  UPDATE_FIELD() {
    this.dispatch({ type: LogInActions.UPDATE_FIELD });
  }

  TOGGLE_LOG_IN_MODAL() {
    this.dispatch({ type: LogInActions.TOGGLE_LOG_IN_MODAL });
  }
}
