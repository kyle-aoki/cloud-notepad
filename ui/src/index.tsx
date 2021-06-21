import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';

import { accountReducer, AccountState } from './redux/reducers/account';
import { fileSystemReducer, FileSystemState } from './redux/reducers/file-system';
import { menuReducer, MenuState } from './redux/reducers/menu';
import {
  createAccountModalReducer,
  CreateAccountModalState,
} from './redux/reducers/create-account/reducer';
import { checkUsernameSaga, createAccountSaga } from './redux/reducers/create-account/saga';

export interface GlobalState {
  fileSystem: FileSystemState;
  menu: MenuState;
  account: AccountState;
  createAccountModal: CreateAccountModalState;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  account: accountReducer,
  fileSystem: fileSystemReducer,
  menu: menuReducer,
  createAccountModal: createAccountModalReducer,
});
export const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(createAccountSaga);
sagaMiddleware.run(checkUsernameSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
