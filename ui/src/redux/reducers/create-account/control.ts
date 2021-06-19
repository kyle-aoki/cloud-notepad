import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountCreationField, CreateAccountModalActions } from './reducer';

export const useAccountCreationControl = (): AccountCreationControl => {
  const dispatch = useDispatch();
  return new AccountCreationControl(dispatch);
};

export default class AccountCreationControl {
  dispatch: Dispatch<any>;

  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  OPEN_CREATE_ACCOUNT_MODAL() {
    return { type: CreateAccountModalActions.OPEN_CREATE_ACCOUNT_MODAL };
  }

  CLOSE_CREATE_ACCOUNT_MODAL() {
    return { type: CreateAccountModalActions.CLOSE_CREATE_ACCOUNT_MODAL };
  }

  CHECK_USERNAME_LOADING() {
    return { type: CreateAccountModalActions.CHECK_USERNAME_LOADING };
  }

  CHECK_PASSWORD_LOADING() {
    return { type: CreateAccountModalActions.CHECK_PASSWORD_LOADING };
  }

  TRIGGER_ACCOUNT_CREATION() {
    return { type: CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION };
  }

  ACCOUNT_CREATED_SUCCESS() {
    return { type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS };
  }

  ACCOUNT_FAILED_TO_CREATE() {
    return { type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE };
  }

  UPDATE_INPUT(field: AccountCreationField, value: string) {
    return {
      type: CreateAccountModalActions.UPDATE_INPUT,
      payload: {
        field,
        value,
      },
    };
  }

  USERNAME_TO_PASSWORD_SCREEN() {
    return { type: CreateAccountModalActions.USERNAME_TO_PASSWORD_SCREEN };
  }

  PASSWORD_TO_USERNAME_SCREEN() {
    return { type: CreateAccountModalActions.PASSWORD_TO_USERNAME_SCREEN };
  }

  RESET_ACCOUNT_CREATION_STATE() {
    return { type: CreateAccountModalActions.RESET_ACCOUNT_CREATION_STATE };
  }
}
