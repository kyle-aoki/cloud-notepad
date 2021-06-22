import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../..';
import { Dispatch } from 'redux';
import { AccountActions, AccountState } from './reducer';

export const useAccountDropdownControl = () => {
  const state = useSelector((state: GlobalState) => state.account);
  const dispatch = useDispatch();
  return new AccountDropdownControl(state, dispatch);
};

export class AccountDropdownControl {
  state: AccountState;
  dispatch: Dispatch<any>;
  constructor(state: AccountState, dispatch: Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  TOGGLE_ACCOUNT_DROPDOWN() {
    this.dispatch({ type: AccountActions.TOGGLE_ACCOUNT_DROPDOWN });
  }
}
