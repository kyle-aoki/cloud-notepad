import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GlobalState } from '.';
import AccountCreationPane from './components/account-creation';
import Editor from './components/editor/editor';
import FileSystem from './components/file-system/file-system';
import StatusBar from './components/statusbar/status-bar';
import Taskbar from './components/taskbar/taskbar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const App: FC = () => {
  const fileSystemOpen = useSelector((state: GlobalState) => state.fileSystem.fileSystemOpen);
  return (
    <AppContainer>
      {fileSystemOpen && <FileSystem />}
      {true && <AccountCreationPane />}

      <Taskbar />
      <Editor />
      <StatusBar />
    </AppContainer>
  );
};

export default App;
