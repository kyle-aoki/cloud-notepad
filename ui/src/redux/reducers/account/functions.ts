import { AccountState } from "./reducer";

export const TOGGLE_ACCOUNT_DROPDOWN = (state: AccountState) => {
  state.accountMenuOpen = !state.accountMenuOpen;
  return { ...state };
};
