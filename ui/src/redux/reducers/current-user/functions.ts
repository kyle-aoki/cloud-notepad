import { CurrentUserAction, CurrentUserState } from './reducer';

export function SET_CURRENT_USER(state: CurrentUserState, action: CurrentUserAction) {
  const newUserUsername = action.payload.newUserUsername;
  state.currentUser = newUserUsername;
  return { ...state };
}
export function UNSET_CURRENT_USER(state: CurrentUserState, action: CurrentUserAction) {
  state.currentUser = '';
  return { ...state };
}
