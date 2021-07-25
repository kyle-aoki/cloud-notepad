import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useFileSystemState } from '../file-system/redux';
import './consolas.css';
import { Editor, useEditorState } from './redux';

interface EditorElementProps {}

const EditorElement = styled.textarea.attrs((props: EditorElementProps) => ({
  spellCheck: false,
  wrap: 'off',
}))`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: 'Consolas';
  outline: none;
  border: none;
  resize: none;
  padding: 2px 4px;
  overflow: scroll;
  cursor: auto;
  font-size: 22px;
`;

const EditorComponent: FC = () => {
  const { fileContent } = useEditorState();
  const EditorController = new Editor.Instance(useDispatch());
  const { fileSaveState } = useFileSystemState();

  return <EditorElement value={fileContent} onChange={(e) => EditorController.SAGA.HANDLE_EDITOR_CHANGE(e.target.value, fileSaveState)} />;
};

export default EditorComponent;
