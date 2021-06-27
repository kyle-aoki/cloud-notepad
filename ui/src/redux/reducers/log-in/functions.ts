import { LogInAction, LogInState } from './reducer';

export function UPDATE_FIELD(state: LogInState, action: LogInAction) {
  const field = action.payload.field;
  const value = action.payload.value;
  return { ...state, [field]: value };
}

export function TOGGLE_LOG_IN_MODAL(state: LogInState, action: LogInAction) {
  state.showLogInModal = !state.showLogInModal;
  return { ...state };
}
