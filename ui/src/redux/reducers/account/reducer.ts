import { Reducer } from 'redux';
import { AccountAction, AccountActions, TOGGLE_ACCOUNT_DROPDOWN } from '.';

export interface AccountState {
  accountMenuOpen: boolean;
  userLoggedIn: boolean;
}

const initialState: AccountState = {
  accountMenuOpen: false,
  userLoggedIn: false,
};

export const accountReducer: Reducer<AccountState, AccountAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACCOUNT_DROPDOWN:
      return TOGGLE_ACCOUNT_DROPDOWN(state);
    default:
      return state;
  }
};
