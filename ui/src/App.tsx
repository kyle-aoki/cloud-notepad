import React, { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '.';
import AccountCreationModal from './components/account-creation';
import Editor from './components/editor/editor';
import FileSystem from './components/file-system/file-system';
import StatusBar from './components/statusbar/status-bar';
import Taskbar from './components/taskbar/taskbar';
import { inDevelopment } from './env/environment';
import useNotifications from './hooks/use-notifications';
import ReduxPane from './redux/redux-pane/redux-pane';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const App: FC = () => {
  const fileSystemOpen = useSelector((state: GlobalState) => state.fileSystem.fileSystemOpen);

  useNotifications();

  return (
    <>
      <Toaster />
      {inDevelopment && <ReduxPane />}

      <AppContainer>
        {fileSystemOpen && <FileSystem />}
        <AccountCreationModal />

        <Taskbar />
        <Editor />
        <StatusBar />
      </AppContainer>
    </>
  );
};

export default App;
