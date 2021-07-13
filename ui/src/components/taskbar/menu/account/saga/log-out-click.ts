import { put, takeEvery } from 'redux-saga/effects';
import { Notif } from '../../../../../notif/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* LogOutSaga(): Generator<any, any, any> {
  const AccountController = new Account.Instance(put);
  const MenuControl = new Menu.Instance(put);
  const NotifController = new Notif.Instance(put);

  yield AccountController.UNSET_USER();
  yield NotifController.PUSH_INFO("You've been logged out.");
  yield MenuControl.CLOSE_ALL();
}

export function* LogOutSagaMiddleware() {
  yield takeEvery(Account.SAGA.LOG_OUT.meta.type, LogOutSaga);
}
