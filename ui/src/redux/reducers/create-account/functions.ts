import {
  accountCreationInitialState,
  AccountCreationScreen,
  CreateAccountModalAction,
  CreateAccountModalState,
} from './reducer';

export const OPEN_MODAL = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  state.createAccountModalOpen = true;
  return { ...state };
};

export const CLOSE_MODAL = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  state.createAccountModalOpen = false;
  return { ...state };
};

export const USERNAME_LOADING = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  state.usernameLoading = true;
  return { ...state };
};

export const PASSWORD_LOADING = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  state.usernameLoading = false;
  state.passwordLoading = true;
  return { ...state };
};

export const ACCOUNT_CREATED_SUCCESS = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  state.accountCreateFailiure = false;
  state.accountCreatedSuccess = true;
  return { ...state };
};

export const ACCOUNT_FAILED_TO_CREATE = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  state.accountCreatedSuccess = false;
  state.accountCreateFailiure = true;
  return { ...state };
};

export const UPDATE_INPUT = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  const field = action.payload.field;
  const value = action.payload.value;

  state[field] = value;
  return { ...state };
};

export const GO_TO_PASSWORD_SCREEN = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  return {
    ...state,
    accountCreationScreen: AccountCreationScreen.PASSWORD_INPUT,
  };
};

export const GO_BACK_TO_USERNAME_SCREEN = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  return {
    ...state,
    accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,
  };
};

export const RESET_ACCOUNT_CREATION_STATE = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  return accountCreationInitialState;
};
