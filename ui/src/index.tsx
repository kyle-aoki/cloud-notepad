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
import { Menu } from './components/taskbar/menu/redux/redux';
import { LogIn } from './components/log-in/redux';
import { LogInSagaMiddleware } from './components/log-in/saga/submit-log-in';
import { FileSystem } from './components/file-system/redux';
import { OpenLogInSagaMiddleware } from './components/taskbar/menu/account/saga/log-in-click';
import { LogOutSagaMiddleware } from './components/taskbar/menu/account/saga/log-out-click';
import { CreateAccountSagaMiddleware } from './components/taskbar/menu/account/saga/create-account-button-click';
import { HandleFolderClickSagaMiddleware } from './components/file-system/saga/handle-folder-click';
import { Editor } from './components/editor/redux';
import { OnSaveClickSagaMiddlware } from './components/file-system/saga/on-save-click';
import { HandleFileClickSagaMiddleware } from './components/file-system/saga/handle-file-click';
import { CreateFolderSagaMiddleware } from './components/file-system/saga/create-folder';
import { HandleEditorChangeSagaMiddlware } from './components/editor/saga/handle-editor-change';
import { SaveModal } from './components/save-modal/redux';
import { OpenClickSagaMiddlware } from './components/taskbar/menu/redux/saga/open-click';
import { SaveClickSagaMiddlware } from './components/taskbar/menu/redux/saga/save-click';

export interface GlobalState {
  FileSystem: FileSystem.SHAPE;
  Menu: Menu.SHAPE;
  Account: Account.SHAPE;
  AccountCreation: AccountCreation.SHAPE;
  Notif: Notif.SHAPE;
  LogIn: LogIn.SHAPE;
  Editor: Editor.SHAPE;
  SaveModal: SaveModal.SHAPE;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  Account: Account.REDUCER,
  FileSystem: FileSystem.REDUCER,
  Menu: Menu.REDUCER,
  AccountCreation: AccountCreation.REDUCER,
  Notif: Notif.REDUCER,
  LogIn: LogIn.REDUCER,
  Editor: Editor.REDUCER,
  SaveModal: SaveModal.REDUCER,
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
sagaMiddleware.run(OnSaveClickSagaMiddlware);
sagaMiddleware.run(HandleFileClickSagaMiddleware);
sagaMiddleware.run(CreateFolderSagaMiddleware);
sagaMiddleware.run(HandleEditorChangeSagaMiddlware);
sagaMiddleware.run(SaveClickSagaMiddlware);
sagaMiddleware.run(OpenClickSagaMiddlware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
