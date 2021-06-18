import { CreateAccountModalState } from './reducer';

export const OPEN_CREATE_ACCOUNT_MODAL = (state: CreateAccountModalState) => {
  state.createAccountModalOpen = true;
  return { ...state };
};
export const CLOSE_CREATE_ACCOUNT_MODAL = (state: CreateAccountModalState) => {
  state.createAccountModalOpen = false;
  return { ...state };
};
