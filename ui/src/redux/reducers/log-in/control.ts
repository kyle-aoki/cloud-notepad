import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../..';
import { Dispatch } from 'redux';
import { LogInActions } from './reducer';
import { AccountSagaActions } from '../account/reducer';

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

  UPDATE_FIELD(field: string, value: string) {
    this.dispatch({ type: LogInActions.UPDATE_FIELD, payload: { field, value } });
  }

  TOGGLE_LOG_IN_MODAL() {
    this.dispatch({ type: LogInActions.TOGGLE_LOG_IN_MODAL });
  }

  SUBMIT_LOG_IN(username: string, password: string) {
    this.dispatch({ type: AccountSagaActions.SUBMIT_LOG_IN, payload: { username, password } });
  }

  START_LOADING() {
    this.dispatch({ type: LogInActions.START_LOADING });
  }

}
