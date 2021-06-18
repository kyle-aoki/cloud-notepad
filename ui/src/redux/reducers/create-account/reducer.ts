import { Reducer } from 'redux';
import { OPEN_CREATE_ACCOUNT_MODAL, CLOSE_CREATE_ACCOUNT_MODAL } from './functions';
import { CreateAccountModalActions } from './actions';
import { CreateAccountModalAction } from './types';

export interface CreateAccountModalState {
  createAccountModalOpen: boolean;
}

const initialState: CreateAccountModalState = {
  createAccountModalOpen: false,
};

export const createAccountModalReducer: Reducer<CreateAccountModalState, CreateAccountModalAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CreateAccountModalActions.OPEN_REATE_ACCOUNT_MODAL:
      return OPEN_CREATE_ACCOUNT_MODAL(state);
    case CreateAccountModalActions.CLOSE_CREATE_ACCOUNT_MODAL:
      return CLOSE_CREATE_ACCOUNT_MODAL(state);
    default:
      return state;
  }
};
