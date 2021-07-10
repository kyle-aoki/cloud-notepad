import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../../../..';
import { Dispatch } from 'redux';
import { AccountActions, AccountState } from './reducer';
import { Executor } from '../../../../../redux/class';

export const useAccountState = () => useSelector((state: GlobalState) => state.account);

export class AccountControl extends Executor {
  TOGGLE_ACCOUNT_DROPDOWN() {
    return this.exec({ type: AccountActions.TOGGLE_ACCOUNT_DROPDOWN });
  }

  SET_USER(username: string) {
    return this.exec({ type: AccountActions.SET_USER, payload: { username } });
  }

  UNSET_USER() {
    return this.exec({ type: AccountActions.UNSET_USER });
  }
}
