import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { CreateAccountModalActions, CreateAccountModalState } from './reducer';

export const useAccountCreationControl = (): AccountCreationControl => {
  const dispatch = useDispatch();
  const state = useSelector((state: GlobalState) => state.createAccountModal);
  return new AccountCreationControl(dispatch, state);
};

export default class AccountCreationControl {
  dispatch: Dispatch<any>;
  state: CreateAccountModalState;

  constructor(dispatch: Dispatch<any>, state: CreateAccountModalState) {
    this.dispatch = dispatch;
    this.state = state;
  }

  OPEN_MODAL() {
    this.dispatch({ type: CreateAccountModalActions.OPEN_MODAL });
  }

  CLOSE_MODAL() {
    this.dispatch({ type: CreateAccountModalActions.CLOSE_MODAL });
  }

  USERNAME_LOADING() {
    this.dispatch({ type: CreateAccountModalActions.USERNAME_LOADING });
  }

  PASSWORD_LOADING() {
    this.dispatch({ type: CreateAccountModalActions.PASSWORD_LOADING });
  }

  TRIGGER_ACCOUNT_CREATION() {
    this.PASSWORD_LOADING();
    this.dispatch({
      type: CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION,
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }

  ACCOUNT_CREATED_SUCCESS() {
    this.dispatch({ type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS });
  }

  ACCOUNT_FAILED_TO_CREATE() {
    this.dispatch({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE });
  }

  UPDATE_INPUT(field: string, value: string) {
    this.dispatch({ type: CreateAccountModalActions.UPDATE_INPUT, payload: { field, value } });
  }

  GO_TO_PASSWORD_SCREEN() {
    this.dispatch({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });
  }

  GO_BACK_TO_USERNAME_SCREEN() {
    this.dispatch({ type: CreateAccountModalActions.GO_BACK_TO_USERNAME_SCREEN });
  }

  RESET_ACCOUNT_CREATION_STATE() {
    this.dispatch({ type: CreateAccountModalActions.RESET_ACCOUNT_CREATION_STATE });
  }

  CHECK_USERNAME() {
    this.USERNAME_LOADING();
    this.dispatch({
      type: CreateAccountModalActions.CHECK_USERNAME,
      payload: {
        username: this.state.username,
      },
    });
  }
}
