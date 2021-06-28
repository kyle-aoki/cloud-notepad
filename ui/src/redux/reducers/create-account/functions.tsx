import { CheckUsernameResponse, GenericError, LogInResponse, ValidationResponse } from '../../../shared';
import { UsernameDisplay } from '../../../ui/username-font';
import { NotificationType } from '../notifications/reducer';
import {
  accountCreationInitialState,
  AccountCreationScreen,
  CreateAccountModalAction,
  CreateAccountModalState,
} from './reducer';

export const OPEN_MODAL = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  return { ...accountCreationInitialState, createAccountModalOpen: true };
};

export const CLOSE_MODAL = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  state.createAccountModalOpen = false;
  return { ...state };
};

export const USERNAME_LOADING = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  state.usernameLoading = true;
  return { ...state };
};

export const PASSWORD_LOADING = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  state.usernameLoading = false;
  state.passwordLoading = true;
  return { ...state };
};

export const ACCOUNT_CREATED_SUCCESS = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  switch (action.payload.type) {
    case LogInResponse.SUCCESSFUL_LOG_IN:
      state.newUserUsername = action.payload.username;
      break;
  }
  return { ...state, passwordLoading: false, done: true };
};

export const ACCOUNT_FAILED_TO_CREATE = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  if (!action.payload) {
    return { ...state, passwordLoading: false };
  }
  switch (action.payload.type) {
    case GenericError.NETWORK_ERROR:
      state.notificationType = NotificationType.ERROR;
      state.notificationText =
        'Network Error.\nEither the server is down, or your internet connection may be defective.';
      break;
    case ValidationResponse.PASSWORD_SHORT:
      state.notificationType = NotificationType.ERROR;
      state.notificationText = `Password is too short.`;
      break;
    case ValidationResponse.PASSWORD_LONG:
      state.notificationType = NotificationType.ERROR;
      state.notificationText = `Password is too long.`;
      break;
    case ValidationResponse.INVALID_PASSWORD_SYMBOLS:
      state.notificationType = NotificationType.ERROR;
      state.notificationText = `Password contains invalid symbols.\nYou CANNOT use ${action.payload.invalidSymbols[0]} or ${action.payload.invalidSymbols[1]}.`;
      break;
    default:
      return { ...state, passwordLoading: false };
  }
  return { ...state, passwordLoading: false, notificationCount: (state.notificationCount += 1) };
};

export const UPDATE_INPUT = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  const field = action.payload.field;
  const value = action.payload.value;

  state[field] = value;
  return { ...state };
};

export const GO_TO_PASSWORD_SCREEN = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  return {
    ...state,
    usernameLoading: false,
    accountCreationScreen: AccountCreationScreen.PASSWORD_INPUT,
  };
};

export const GO_BACK_TO_USERNAME_SCREEN = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  return {
    ...state,
    usernameLoading: false,
    accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,
  };
};

export const RESET_ACCOUNT_CREATION_STATE = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  return accountCreationInitialState;
};

export const BAD_USERNAME = (state: CreateAccountModalState, action: CreateAccountModalAction) => {
  if (!action.payload) {
    return { ...state, usernameLoading: false };
  }
  switch (action.payload.type) {
    case GenericError.NETWORK_ERROR:
      state.notificationText =
        'Network Error.\nEither the server is down, or your internet connection may be defective.';
      state.notificationType = NotificationType.ERROR;
      break;
    case ValidationResponse.USERNAME_SHORT:
      state.notificationText = 'Username is too short.';
      state.notificationType = NotificationType.ERROR;
      break;
    case ValidationResponse.USERNAME_LONG:
      state.notificationText = 'Username is too long.';
      state.notificationType = NotificationType.ERROR;
      break;
    case ValidationResponse.INVALID_USERNAME_SYMBOLS:
      state.notificationText = `Username contains invalid symbols.\nYou may only use ${action.payload.validSymbols.reduce(
        (acc: string, symbol: string, index: number) => {
          if (index === 0) return `${symbol}`;
          return `${acc}, ${symbol}`;
        },
        ''
      )}.`;
      state.notificationType = NotificationType.ERROR;
      break;
    case CheckUsernameResponse.USER_EXISTS:
      state.notificationText = 'Someone already has this username.\nTry another username.';
      state.notificationType = NotificationType.ERROR;
      break;
    default:
      return { ...state, usernameLoading: false };
  }
  return { ...state, usernameLoading: false, notificationCount: (state.notificationCount += 1) };
};
