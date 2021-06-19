import { Reducer } from 'redux';
import {
  OPEN_CREATE_ACCOUNT_MODAL,
  CLOSE_CREATE_ACCOUNT_MODAL,
  ACCOUNT_CREATED_SUCCESS,
  ACCOUNT_FAILED_TO_CREATE,
  CHECK_PASSWORD_LOADING,
  CHECK_USERNAME_LOADING,
  TRIGGER_ACCOUNT_CREATION,
} from './functions';

export enum CreateAccountModalActions {
  OPEN_CREATE_ACCOUNT_MODAL,
  CLOSE_CREATE_ACCOUNT_MODAL,
  CHECK_USERNAME_LOADING,
  CHECK_PASSWORD_LOADING,
  TRIGGER_ACCOUNT_CREATION,
  ACCOUNT_CREATED_SUCCESS,
  ACCOUNT_FAILED_TO_CREATE,
  UPDATE_INPUT,
  USERNAME_TO_PASSWORD_SCREEN,
  PASSWORD_TO_USERNAME_SCREEN,
  RESET_ACCOUNT_CREATION_STATE,
}

export interface CreateAccountModalState {
  createAccountModalOpen: boolean;
  usernameLoading: boolean;
  passwordLoading: boolean;
  createAccountAttempt: number;
  accountCreatedSuccess: boolean;
  accountCreateFailiure: boolean;
  username: string;
  password: string;
  accountCreationScreen: AccountCreationScreen;
}

export enum AccountCreationScreen {
  USERNAME_INPUT,
  PASSWORD_INPUT,
}

export const accountCreationInitialState: CreateAccountModalState = {
  createAccountModalOpen: false,
  usernameLoading: false,
  passwordLoading: false,
  createAccountAttempt: 0,
  accountCreatedSuccess: false,
  accountCreateFailiure: false,
  username: '',
  password: '',
  accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,
};

export type AccountCreationField = 'username' | 'password';

export interface CreateAccountModalAction {
  type: CreateAccountModalActions;
  payload: {
    field: AccountCreationField;
    value: string;
  };
}

export const createAccountModalReducer: Reducer<CreateAccountModalState, CreateAccountModalAction> =
  (state = accountCreationInitialState, action) => {
    switch (action.type) {
      case CreateAccountModalActions.OPEN_CREATE_ACCOUNT_MODAL:
        return OPEN_CREATE_ACCOUNT_MODAL(state);
      case CreateAccountModalActions.CLOSE_CREATE_ACCOUNT_MODAL:
        return CLOSE_CREATE_ACCOUNT_MODAL(state);
      case CreateAccountModalActions.CHECK_USERNAME_LOADING:
        return CHECK_USERNAME_LOADING(state);
      case CreateAccountModalActions.CHECK_PASSWORD_LOADING:
        return CHECK_PASSWORD_LOADING(state);
      case CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION:
        return TRIGGER_ACCOUNT_CREATION(state);
      case CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS:
        return ACCOUNT_CREATED_SUCCESS(state);
      case CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE:
        return ACCOUNT_FAILED_TO_CREATE(state);
      default:
        return state;
    }
  };
