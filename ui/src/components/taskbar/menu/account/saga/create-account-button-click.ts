import { put, takeEvery } from 'redux-saga/effects';
import { AccountCreation } from '../../../../account-creation/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* CreateAccountSaga(): Generator<any, any, any> {
  const AccountCreationController = new AccountCreation.Instance(put);
  const MenuControl = new Menu.Instance(put);

  yield AccountCreationController.OPEN_MODAL();
  yield MenuControl.CLOSE_ALL();
}

export function* CreateAccountSagaMiddleware() {
  yield takeEvery(Account.SAGA.CREATE_ACCOUNT.meta.type, CreateAccountSaga);
}
