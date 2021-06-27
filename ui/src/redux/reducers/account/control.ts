import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../..';
import { Dispatch } from 'redux';
import { AccountActions, AccountState } from './reducer';

export const useAccountState = () => {
  const state = useSelector((state: GlobalState) => state.account);
  return state;
};

export const useAccountControl = () => {
  const dispatch = useDispatch();
  return new AccountControl(dispatch);
};

export class AccountControl {
  dispatch: Dispatch<any>;
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  TOGGLE_ACCOUNT_DROPDOWN() {
    this.dispatch({ type: AccountActions.TOGGLE_ACCOUNT_DROPDOWN });
  }

  SET_USER(username: string) {
    this.dispatch({ type: AccountActions.SET_USER, payload: { username } });
  }
  UNSET_USER() {
    this.dispatch({ type: AccountActions.UNSET_USER });
  }
}
