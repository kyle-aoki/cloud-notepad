import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import styled from 'styled-components';
import { GlobalState } from '.';
import AccountCreationModal from './components/account-creation';
import Editor from './components/editor/editor';
import FileSystem from './components/file-system/file-system';
import { LogInModal } from './components/log-in';
import StatusBar from './components/statusbar/status-bar';
import Taskbar from './components/taskbar/taskbar';
import { inDevelopment } from './env/environment';
import { NotificationActions, NotificationType } from './notifications/redux/reducer';
import ReduxPane from './redux/redux-pane/redux-pane';
import useNotifications from './notifications/use-notifications';
import Notifications from './notifications/component';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const App: FC = () => {
  const fileSystemOpen = useSelector((state: GlobalState) => state.fileSystem.fileSystemOpen);

  return (
    <>
      <Notifications />
      {inDevelopment && <ReduxPane />}

      <AppContainer>
        {fileSystemOpen && <FileSystem />}
        <AccountCreationModal />
        <LogInModal />

        <Taskbar />
        <Editor />
        <StatusBar />
      </AppContainer>
    </>
  );
};

export default App;
