import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../../../..';
import { Dispatch } from 'redux';
import { AccountActions, AccountState } from './reducer';
import { Actuator } from '../../../../../redux/class';

export const useAccountState = () => useSelector((state: GlobalState) => state.account);

export class AccountControl extends Actuator {
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
