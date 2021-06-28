import { ReactNode } from 'react';
import { Reducer } from 'redux';
import { NotificationType } from '../../../notifications/redux/reducer';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  USERNAME_LOADING,
  PASSWORD_LOADING,
  ACCOUNT_CREATED_SUCCESS,
  ACCOUNT_FAILED_TO_CREATE,
  UPDATE_INPUT,
  GO_TO_PASSWORD_SCREEN,
  GO_BACK_TO_USERNAME_SCREEN,
  RESET_ACCOUNT_CREATION_STATE,
  BAD_USERNAME,
} from './functions';

export enum CreateAccountModalActions {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',

  USERNAME_LOADING = 'USERNAME_LOADING',
  CHECK_USERNAME = 'CHECK_USERNAME',
  BAD_USERNAME = 'BAD_USERNAME',

  PASSWORD_LOADING = 'PASSWORD_LOADING',
  BAD_PASSWORD = 'BAD_PASSWORD',

  TRIGGER_ACCOUNT_CREATION = 'TRIGGER_ACCOUNT_CREATION',
  ACCOUNT_CREATED_SUCCESS = 'ACCOUNT_CREATED_SUCCESS',
  ACCOUNT_FAILED_TO_CREATE = 'ACCOUNT_FAILED_TO_CREATE',
  UPDATE_INPUT = 'UPDATE_INPUT',
  GO_TO_PASSWORD_SCREEN = 'GO_TO_PASSWORD_SCREEN',
  GO_BACK_TO_USERNAME_SCREEN = 'GO_BACK_TO_USERNAME_SCREEN',
  RESET_ACCOUNT_CREATION_STATE = 'RESET_ACCOUNT_CREATION_STATE',
}

export interface CreateAccountModalState {
  [x: string]: any;
  done: boolean;
  createAccountModalOpen: boolean;
  usernameLoading: boolean;
  passwordLoading: boolean;

  notificationCount: number;
  notificationType: NotificationType;
  notificationText: string;

  createAccountAttempt: number;
  accountCreatedSuccess: boolean;
  accountCreateFailiure: boolean;
  
  username: string;
  password: string;
  accountCreationScreen: AccountCreationScreen;

  newUserUsername: string;
}

export enum AccountCreationScreen {
  USERNAME_INPUT,
  PASSWORD_INPUT,
}

export const accountCreationInitialState: CreateAccountModalState = {
  done: false,
  createAccountModalOpen: false,
  usernameLoading: false,
  passwordLoading: false,

  notificationCount: 0,
  notificationType: NotificationType.INFO,
  notificationText: '',

  createAccountAttempt: 0,
  accountCreatedSuccess: false,
  accountCreateFailiure: false,
  username: '',
  password: '',
  accountCreationScreen: AccountCreationScreen.USERNAME_INPUT,

  newUserUsername: '',
};

export interface CreateAccountModalAction {
  type: CreateAccountModalActions;
  payload: any;
}

export const createAccountModalReducer: Reducer<CreateAccountModalState, CreateAccountModalAction> = (
  state = accountCreationInitialState,
  action
) => {
  switch (action.type) {
    case CreateAccountModalActions.OPEN_MODAL:
      return OPEN_MODAL(state, action);
    case CreateAccountModalActions.CLOSE_MODAL:
      return CLOSE_MODAL(state, action);
    case CreateAccountModalActions.USERNAME_LOADING:
      return USERNAME_LOADING(state, action);
    case CreateAccountModalActions.PASSWORD_LOADING:
      return PASSWORD_LOADING(state, action);
    case CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS:
      return ACCOUNT_CREATED_SUCCESS(state, action);
    case CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE:
      return ACCOUNT_FAILED_TO_CREATE(state, action);
    case CreateAccountModalActions.UPDATE_INPUT:
      return UPDATE_INPUT(state, action);
    case CreateAccountModalActions.GO_TO_PASSWORD_SCREEN:
      return GO_TO_PASSWORD_SCREEN(state, action);
    case CreateAccountModalActions.GO_BACK_TO_USERNAME_SCREEN:
      return GO_BACK_TO_USERNAME_SCREEN(state, action);
    case CreateAccountModalActions.RESET_ACCOUNT_CREATION_STATE:
      return RESET_ACCOUNT_CREATION_STATE(state, action);
    case CreateAccountModalActions.BAD_USERNAME:
      return BAD_USERNAME(state, action);
    default:
      return state;
  }
};
