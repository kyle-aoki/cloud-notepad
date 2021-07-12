import { put, takeEvery } from 'redux-saga/effects';
import { AccountCreation } from '../../../../account-creation/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* CREATE_ACCOUNT(): Generator<any, any, any> {
  const AccountCreationController = new AccountCreation.Instance(put);
  const MenuControl = new Menu.Instance(put);

  // LogInController.TOGGLE_LOG_IN_MODAL();
  MenuControl.CLOSE_ALL();
}

export function* CREATE_ACCOUNTMiddlware() {
  yield takeEvery(Account.SAGA.CREATE_ACCOUNT.meta.type, CREATE_ACCOUNT);
}
