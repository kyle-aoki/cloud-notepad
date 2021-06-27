import { Reducer } from 'redux';
import { SET_USER, TOGGLE_ACCOUNT_DROPDOWN, UNSET_USER } from './functions';

export interface AccountState {
  accountMenuOpen: boolean;
  username: string | null;
}

const initialState: AccountState = {
  accountMenuOpen: false,
  username: localStorage.getItem('username'),
};

export type AccountAction = {
  type: AccountActions;
  payload: any;
};

export enum AccountSagaActions {
  LOG_IN = 'LOG_IN',
}

export enum AccountActions {
  TOGGLE_ACCOUNT_DROPDOWN = 'AccountActions.TOGGLE_ACCOUNT_DROPDOWN',

  SET_USER = 'AccountActions.SET_USER',
  UNSET_USER = 'AccountActions.UNSET_USER',
  INVALID_LOG_IN = 'INVALID_LOG_IN',
}

export const accountReducer: Reducer<AccountState, AccountAction> = (state = initialState, action) => {
  switch (action.type) {
    case AccountActions.TOGGLE_ACCOUNT_DROPDOWN:
      return TOGGLE_ACCOUNT_DROPDOWN(state, action);
    case AccountActions.SET_USER:
      return SET_USER(state, action);
    case AccountActions.UNSET_USER:
      return UNSET_USER(state, action);
    default:
      return state;
  }
};
