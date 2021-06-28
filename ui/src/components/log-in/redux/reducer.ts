import { Reducer } from 'redux';
import { START_LOADING, STOP_LOADING, TOGGLE_LOG_IN_MODAL, UPDATE_FIELD } from './functions';

export interface LogInState {
  loading: boolean;
  showLogInModal: boolean;
  username: string;
  password: string;
}

const initialState: LogInState = {
  loading: false,
  showLogInModal: false,
  username: '',
  password: '',
};

export type LogInAction = {
  type: LogInActions;
  payload: any;
};

export enum LogInActions {
  START_LOADING = 'LogInActions.START_LOADING',
  STOP_LOADING = 'LogInActions.STOP_LOADING',
  TOGGLE_LOG_IN_MODAL = 'LogInActions.TOGGLE_LOG_IN_MODAL',
  UPDATE_FIELD = 'LogInActions.UPDATE_FIELD',
  SUBMIT_LOG_IN = 'LogInActions.SUBMIT_LOG_IN',
}

export const LogInReducer: Reducer<LogInState, LogInAction> = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case LogInActions.START_LOADING:
      return START_LOADING(state, action);
    case LogInActions.STOP_LOADING:
      return STOP_LOADING(state, action);
    case LogInActions.UPDATE_FIELD:
      return UPDATE_FIELD(state, action);
    case LogInActions.TOGGLE_LOG_IN_MODAL:
      return TOGGLE_LOG_IN_MODAL(state, action);
    default:
      return state;
  }
};
