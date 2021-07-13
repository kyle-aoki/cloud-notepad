import { put, takeEvery } from 'redux-saga/effects';
import { LogIn } from '../../../../log-in/redux';
import { Menu } from '../../../redux';
import { Account } from '../redux';

function* OpenLogInSaga(): Generator<any, any, any> {
  const MenuControl = new Menu.Instance(put);
  const LogInController = new LogIn.Instance(put);

  yield LogInController.TOGGLE_LOG_IN_MODAL();
  yield MenuControl.CLOSE_ALL();
}

export function* OpenLogInSagaMiddleware() {
  yield takeEvery(Account.SAGA.LOG_IN.meta.type, OpenLogInSaga);
}
