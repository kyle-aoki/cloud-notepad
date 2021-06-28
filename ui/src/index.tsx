import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';

import { createAccountModalReducer, CreateAccountModalState } from './components/account-creation/redux/reducer';
import { checkUsernameSaga, createAccountSaga } from './components/account-creation/redux/saga';
import { notificationReducer, NotificationState } from './notifications/redux/reducer';
import { FileSystemState, fileSystemReducer } from './components/file-system/redux/reducer';
import { accountReducer, AccountState } from './components/taskbar/menu/account/redux/reducer';
import { menuReducer, MenuState } from './components/taskbar/redux/reducer';
import { GetUserDirSaga } from './components/file-system/redux/saga';
import { LogInReducer, LogInState } from './components/log-in/redux/reducer';
import { LogInSaga } from './components/taskbar/menu/account/redux/saga';
import 'react-toastify/dist/ReactToastify.css';

export interface GlobalState {
  fileSystem: FileSystemState;
  menu: MenuState;
  account: AccountState;
  createAccountModal: CreateAccountModalState;
  notifications: NotificationState;
  LogIn: LogInState;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  account: accountReducer,
  fileSystem: fileSystemReducer,
  menu: menuReducer,
  createAccountModal: createAccountModalReducer,
  notifications: notificationReducer,
  LogIn: LogInReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(createAccountSaga);
sagaMiddleware.run(checkUsernameSaga);
sagaMiddleware.run(GetUserDirSaga);
sagaMiddleware.run(LogInSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
