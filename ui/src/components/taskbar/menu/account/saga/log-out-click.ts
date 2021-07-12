import { put, takeEvery } from 'redux-saga/effects';
import { AccountCreation } from '../../../../account-creation/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* LogOut(): Generator<any, any, any> {
  const AccountCreationController = new AccountCreation.Instance(put);
  const MenuControl = new Menu.Instance(put);

  // AccountController.UNSET_USER();
  MenuControl.CLOSE_ALL();
}

export function* LogOutMiddlware() {
  yield takeEvery("Account.SAGA.LogOut.meta.type", LogOut);
}
