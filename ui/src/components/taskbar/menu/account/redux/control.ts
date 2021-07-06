import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../../../..';
import { Dispatch } from 'redux';
import { AccountActions, AccountState } from './reducer';
import { Actuator } from '../../../../../redux/class';

export const useAccountState = () => {
  const state = useSelector((state: GlobalState) => state.account);
  return state;
};

export const useAccountControl = () => {
  const dispatch = useDispatch();
  return new AccountControl(dispatch);
};

export class AccountControl extends Actuator {
  TOGGLE_ACCOUNT_DROPDOWN() {
    this.exec({ type: AccountActions.TOGGLE_ACCOUNT_DROPDOWN });
  }

  SET_USER(username: string) {
    this.exec({ type: AccountActions.SET_USER, payload: { username } });
  }
  UNSET_USER() {
    this.exec({ type: AccountActions.UNSET_USER });
  }
}
