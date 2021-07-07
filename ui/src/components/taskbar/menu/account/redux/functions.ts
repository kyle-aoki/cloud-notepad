import { AccountAction, AccountState } from './reducer';

export const TOGGLE_ACCOUNT_DROPDOWN = (state: AccountState, action: AccountAction) => {
  state.accountMenuOpen = !state.accountMenuOpen;
  return { ...state };
};

export function SET_USER(state: AccountState, action: AccountAction) {
  const username = action.payload.username;
  localStorage.setItem('username', username);
  state.username = username;
  return { ...state };
}
export function UNSET_USER(state: AccountState, action: AccountAction) {
  state.username = '';
  localStorage.setItem('username', '');
  return { ...state };
}
