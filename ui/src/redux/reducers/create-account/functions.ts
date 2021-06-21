import { CheckUsernameResponse, ValidationResponse } from '../../../shared';
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
    usernameLoading: false,
    accountCreationScreen: AccountCreationScreen.PASSWORD_INPUT,
  };
};

export const GO_BACK_TO_USERNAME_SCREEN = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  return {
    ...state,
    usernameLoading: false,
    accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,
  };
};

export const RESET_ACCOUNT_CREATION_STATE = (
  state: CreateAccountModalState,
  action: CreateAccountModalAction
) => {
  return accountCreationInitialState;
};

export const BAD_USERNAME = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  if (!action.payload) {
    return { ...state, usernameLoading: false };
  }
  switch (action.payload.type) {
    case ValidationResponse.USERNAME_SHORT:
      state.badUsernameReason = `Username is too short.\nMinimum length is ${action.payload.minLength} characters.`;
      break;
    case ValidationResponse.USERNAME_LONG:
      state.badUsernameReason = `Username is too long.\nMaximum length is ${action.payload.maxLength} characters.`;
      break;
    case ValidationResponse.INVALID_USERNAME_SYMBOLS:
      state.badUsernameReason = `Username contains invalid symbols.\nYou may only use ${action.payload.validSymbols.reduce(
        (acc: string, symbol: string, index: number) => {
          if (index === 0) return `${symbol}`;
          return `${acc}, ${symbol}`;
        },
        ''
      )}.`;
      break;
    case CheckUsernameResponse.USER_EXISTS:
      state.badUsernameReason = 'Someone already has this username.\nTry another username.';
      break;
    default:
      return { ...state, usernameLoading: false };
  }
  return { ...state, usernameLoading: false, badUsername: (state.badUsername += 1) };
};
