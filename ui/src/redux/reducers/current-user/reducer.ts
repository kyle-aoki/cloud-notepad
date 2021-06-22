import { Reducer } from 'redux';
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from './functions';

export interface CurrentUserState {
  currentUser: string;
}
export const initialState: CurrentUserState = {
  currentUser: 'abc',
};

export enum CurrentUserActions {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  UNSET_CURRENT_USER = 'UNSET_CURRENT_USER',
}
export interface CurrentUserAction {
  type: CurrentUserActions;
  payload: any;
}

export const CurrentUserReducer: Reducer<CurrentUserState, CurrentUserAction> = (state = initialState, action) => {
  switch (action.type) {
    case CurrentUserActions.SET_CURRENT_USER:
      return SET_CURRENT_USER(state, action);
    case CurrentUserActions.UNSET_CURRENT_USER:
      return UNSET_CURRENT_USER(state, action);
    default:
      return state;
  }
};
