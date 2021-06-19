import {
  accountCreationInitialState,
  AccountCreationScreen,
  CreateAccountModalAction,
  CreateAccountModalState,
} from './reducer';

export const OPEN_CREATE_ACCOUNT_MODAL = (state: CreateAccountModalState) => {
  state.createAccountModalOpen = true;
  return { ...state };
};

export const CLOSE_CREATE_ACCOUNT_MODAL = (state: CreateAccountModalState) => {
  state.createAccountModalOpen = false;
  return { ...state };
};

export const CHECK_USERNAME_LOADING = (state: CreateAccountModalState) => {
  state.usernameLoading = true;
  return { ...state };
};

export const CHECK_PASSWORD_LOADING = (state: CreateAccountModalState) => {
  state.usernameLoading = false;
  state.passwordLoading = true;
  return { ...state };
};

export const TRIGGER_ACCOUNT_CREATION = (state: CreateAccountModalState) => {
  state.passwordLoading = false;
  state.createAccountAttempt += 1;
  return { ...state };
};

export const ACCOUNT_CREATED_SUCCESS = (state: CreateAccountModalState) => {
  state.accountCreatedSuccess = true;
  return { ...state };
};

export const ACCOUNT_FAILED_TO_CREATE = (state: CreateAccountModalState) => {
  state.accountCreateFailiure = true;
  return { ...state };
};

export const UPDATE_INPUT = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  const field = action.payload.field;
  const value = action.payload.value;

  state[field] = value;
  return { ...state };
};

export const USERNAME_TO_PASSWORD_SCREEN = (state: CreateAccountModalState) => {
  return {
    ...state,
    accountCreationScreen: AccountCreationScreen.PASSWORD_INPUT,
  };
};

export const PASSWORD_TO_USERNAME_SCREEN = (state: CreateAccountModalState) => {
  return {
    ...state,
    accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,
  };
};

export const RESET_ACCOUNT_CREATION_STATE = (state: CreateAccountModalState) => {
  return accountCreationInitialState;
};
