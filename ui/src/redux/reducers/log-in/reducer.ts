import { Reducer } from 'redux';
import { TOGGLE_LOG_IN_MODAL, UPDATE_FIELD } from './functions';

export interface LogInState {
  showLogInModal: boolean;
  username: string;
  password: string;
}

const initialState: LogInState = {
  showLogInModal: false,
  username: '',
  password: '',
};

export type LogInAction = {
  type: LogInActions;
  payload: any;
};

export enum LogInActions {
  TOGGLE_LOG_IN_MODAL = 'TOGGLE_LOG_IN_MODAL',
  UPDATE_FIELD = 'LogInActions.UPDATE_FIELD',
  SUBMIT_LOG_IN = 'LogInActions.SUBMIT_LOG_IN',
}

export const LogInReducer: Reducer<LogInState, LogInAction> = (state = initialState, action) => {
  switch (action.type) {
    case LogInActions.UPDATE_FIELD:
      return UPDATE_FIELD(state, action);
    case LogInActions.TOGGLE_LOG_IN_MODAL:
      return TOGGLE_LOG_IN_MODAL(state, action);
    default:
      return state;
  }
};
