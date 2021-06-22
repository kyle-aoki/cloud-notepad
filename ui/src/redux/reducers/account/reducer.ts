import { Reducer } from 'redux';
import { TOGGLE_ACCOUNT_DROPDOWN } from './functions';

export interface AccountState {
  accountMenuOpen: boolean;
  userLoggedIn: boolean;
}

const initialState: AccountState = {
  accountMenuOpen: false,
  userLoggedIn: false,
};

export type AccountAction = {
  type: AccountActions;
};
export enum AccountActions {
  TOGGLE_ACCOUNT_DROPDOWN = 'AccountActions.TOGGLE_ACCOUNT_DROPDOWN',
}

export const accountReducer: Reducer<AccountState, AccountAction> = (state = initialState, action) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACCOUNT_DROPDOWN:
      return TOGGLE_ACCOUNT_DROPDOWN(state);
    default:
      return state;
  }
};
