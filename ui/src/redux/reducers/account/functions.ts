import { AccountState } from '.';

export const OPEN_ACCOUNT_DROPDOWN = (state: AccountState) => {
  state.accountMenuOpen = true;
  return { ...state };
};
export const CLOSE_ACCOUNT_DROPDOWN = (state: AccountState) => {
  state.accountMenuOpen = false;
  return { ...state };
};
