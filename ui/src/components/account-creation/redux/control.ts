import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { Executor } from '../../../redux/class';
import { CreateAccountModalActions, CreateAccountModalState } from './reducer';

export const useAccountCreationState = () => useSelector((state: GlobalState) => state.createAccountModal);

export class AccountCreationControl extends Executor {
  OPEN_MODAL() {
    return this.exec({ type: CreateAccountModalActions.OPEN_MODAL });
  }

  CLOSE_MODAL() {
    return this.exec({ type: CreateAccountModalActions.CLOSE_MODAL });
  }

  USERNAME_LOADING() {
    return this.exec({ type: CreateAccountModalActions.USERNAME_LOADING });
  }

  STOP_USERNAME_LOADING() {
    return this.exec({ type: CreateAccountModalActions.STOP_USERNAME_LOADING });
  }

  PASSWORD_LOADING() {
    return this.exec({ type: CreateAccountModalActions.PASSWORD_LOADING });
  }

  STOP_PASSWORD_LOADING() {
    return this.exec({ type: CreateAccountModalActions.STOP_PASSWORD_LOADING });
  }

  TRIGGER_ACCOUNT_CREATION(username: string, password: string, passwordLoading: boolean) {
    return this.exec({
      type: CreateAccountModalActions.TRIGGER_ACCOUNT_CREATION,
      payload: { username, password, passwordLoading },
    });
  }

  ACCOUNT_CREATED_SUCCESS() {
    return this.exec({ type: CreateAccountModalActions.ACCOUNT_CREATED_SUCCESS });
  }

  ACCOUNT_FAILED_TO_CREATE() {
    return this.exec({ type: CreateAccountModalActions.ACCOUNT_FAILED_TO_CREATE });
  }

  UPDATE_INPUT(field: string, value: string) {
    return this.exec({ type: CreateAccountModalActions.UPDATE_INPUT, payload: { field, value } });
  }

  GO_TO_PASSWORD_SCREEN() {
    return this.exec({ type: CreateAccountModalActions.GO_TO_PASSWORD_SCREEN });
  }

  GO_BACK_TO_USERNAME_SCREEN() {
    return this.exec({ type: CreateAccountModalActions.GO_BACK_TO_USERNAME_SCREEN });
  }

  RESET_ACCOUNT_CREATION_STATE() {
    return this.exec({ type: CreateAccountModalActions.RESET_ACCOUNT_CREATION_STATE });
  }

  CHECK_USERNAME(username: string, usernameLoading: boolean) {
    return this.exec({
      type: CreateAccountModalActions.CHECK_USERNAME,
      payload: { username, usernameLoading },
    });
  }
}
