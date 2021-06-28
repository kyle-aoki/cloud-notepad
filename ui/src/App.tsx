import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { GlobalState } from '.';
import AccountCreationModal from './components/account-creation';
import Editor from './components/editor/editor';
import FileSystem from './components/file-system/file-system';
import { LogInModal } from './components/log-in';
import StatusBar from './components/statusbar/status-bar';
import Taskbar from './components/taskbar/taskbar';
import { inDevelopment } from './env/environment';
import useNotifications from './hooks/notifications/use-notifications';
import { NotificationActions, NotificationType } from './redux/reducers/notifications/reducer';
import ReduxPane from './redux/redux-pane/redux-pane';
import { Slide } from 'react-toastify';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const App: FC = () => {
  const fileSystemOpen = useSelector((state: GlobalState) => state.fileSystem.fileSystemOpen);

  useNotifications();
  const dispatch = useDispatch();

  const ok = () => {
    dispatch({
      type: NotificationActions.PUSH_NOTIFICATION,
      payload: {
        notificationType: NotificationType.INFO,
        notificationText: 'asdfasdf',
      },
    });
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      {inDevelopment && <ReduxPane />}

      <AppContainer>
        <button style={{ position: 'absolute', top: '0', left: '0', zIndex: 1000 }} onClick={ok}>
          ok
        </button>
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
