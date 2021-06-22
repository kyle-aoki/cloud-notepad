import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';

import { accountReducer, AccountState } from './redux/reducers/account';
import { menuReducer, MenuState } from './redux/reducers/menu';
import { createAccountModalReducer, CreateAccountModalState } from './redux/reducers/create-account/reducer';
import { checkUsernameSaga, createAccountSaga } from './redux/reducers/create-account/saga';
import { notificationReducer, NotificationState } from './redux/reducers/notifications/reducer';
import { FileSystemState, fileSystemReducer } from './redux/reducers/file-system/reducer';

export interface GlobalState {
  fileSystem: FileSystemState;
  menu: MenuState;
  account: AccountState;
  createAccountModal: CreateAccountModalState;
  notifications: NotificationState;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  account: accountReducer,
  fileSystem: fileSystemReducer,
  menu: menuReducer,
  createAccountModal: createAccountModalReducer,
  notifications: notificationReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(createAccountSaga);
sagaMiddleware.run(checkUsernameSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
