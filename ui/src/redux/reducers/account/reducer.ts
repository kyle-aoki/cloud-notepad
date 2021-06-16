import { Reducer } from "redux";
import { AccountAction, AccountActions, CLOSE_ACCOUNT_DROPDOWN, OPEN_ACCOUNT_DROPDOWN } from ".";

export interface AccountState {
  accountMenuOpen: boolean;
  userLoggedIn: boolean;
}

const initialState: AccountState = {
  accountMenuOpen: false,
  userLoggedIn: false,
};

export const accountReducer: Reducer<AccountState, AccountAction> = (state = initialState, action) => {
  switch (action.type) {
    case AccountActions.OPEN_ACCOUNT_DROPDOWN: return OPEN_ACCOUNT_DROPDOWN(state);
    case AccountActions.CLOSE_ACCOUNT_DROPDOWN: return CLOSE_ACCOUNT_DROPDOWN(state);
  }
  return state;
};
