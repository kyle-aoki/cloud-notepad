import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { CheckPasswordSagaMiddleware } from './components/account-creation/saga/check-password';
import { GetUserDirSaga } from './components/file-system/saga/get-user-dir';
import 'react-toastify/dist/ReactToastify.css';
import { CheckUsernameSagaMiddleware } from './components/account-creation/saga/check-username';
import { Notif } from './notif/redux';
import { AccountCreation } from './components/account-creation/redux';
import { Account } from './components/taskbar/menu/account/redux';
import { Menu } from './components/taskbar/redux';
import { LogIn } from './components/log-in/redux';
import { LogInSagaMiddleware } from './components/log-in/saga/submit-log-in';
import { FileSystem } from './components/file-system/REDUX';
import { OpenLogInSagaMiddleware } from './components/taskbar/menu/account/saga/log-in-click';
import { LogOutSagaMiddleware } from './components/taskbar/menu/account/saga/log-out-click';
import { CreateAccountSagaMiddleware } from './components/taskbar/menu/account/saga/create-account-button-click';
import { HandleFolderClickSagaMiddleware } from './components/file-system/saga/handle-folder-click';

export interface GlobalState {
  FileSystem: FileSystem.SHAPE;
  Menu: Menu.SHAPE;
  Account: Account.SHAPE;
  AccountCreation: AccountCreation.SHAPE;
  Notif: Notif.SHAPE;
  LogIn: LogIn.SHAPE;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  Account: Account.REDUCER,
  FileSystem: FileSystem.REDUCER,
  Menu: Menu.REDUCER,
  AccountCreation: AccountCreation.REDUCER,
  Notif: Notif.REDUCER,
  LogIn: LogIn.REDUCER,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(CheckPasswordSagaMiddleware);
sagaMiddleware.run(CheckUsernameSagaMiddleware);
sagaMiddleware.run(GetUserDirSaga);
sagaMiddleware.run(CreateAccountSagaMiddleware);
sagaMiddleware.run(LogInSagaMiddleware);
sagaMiddleware.run(OpenLogInSagaMiddleware);
sagaMiddleware.run(LogOutSagaMiddleware);
sagaMiddleware.run(HandleFolderClickSagaMiddleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
