import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '.';
import FileAPI from './api/file.api';
import UserAPI from './api/user-api';
import AccountCreationModal from './components/account-creation';
import Editor from './components/editor/editor';
import FileSystemComponent from './components/file-system/file-system';
import { LogInModal } from './components/log-in';
import StatusBar from './components/statusbar/status-bar';
import Taskbar from './components/taskbar/taskbar';
import { inDevelopment } from './env/environment';
import Notifications from './notif/component';
import ReduxPane from './redux/redux-pane/redux-pane';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const App: FC = () => {
  const fileSystemOpen = useSelector((state: GlobalState) => state.FileSystem.fileSystemOpen);

  return (
    <>
      <Notifications />
      {inDevelopment && <ReduxPane />}

      <AppContainer>
        {fileSystemOpen && <FileSystemComponent />}
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
