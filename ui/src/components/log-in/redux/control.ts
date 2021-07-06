import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../..';
import { Dispatch } from 'redux';
import { LogInActions } from './reducer';
import { AccountSagaActions } from '../../taskbar/menu/account/redux/reducer';
import { Actuator } from '../../../redux/class';

export const useLogInState = () => useSelector((state: GlobalState) => state.LogIn);

export class LogInControl extends Actuator {
  UPDATE_FIELD(field: string, value: string) {
    return this.exec({ type: LogInActions.UPDATE_FIELD, payload: { field, value } });
  }

  TOGGLE_LOG_IN_MODAL() {
    return this.exec({ type: LogInActions.TOGGLE_LOG_IN_MODAL });
  }

  SUBMIT_LOG_IN(username: string, password: string) {
    return this.exec({ type: AccountSagaActions.SUBMIT_LOG_IN, payload: { username, password } });
  }

  START_LOADING() {
    return this.exec({ type: LogInActions.START_LOADING });
  }

  STOP_LOADING() {
    return this.exec({ type: LogInActions.STOP_LOADING });
  }
}
