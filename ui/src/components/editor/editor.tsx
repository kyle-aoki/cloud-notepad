import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
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
  const { fileContent, title } = useEditorState();
  const EditorController = new Editor.Instance(useDispatch());

  const currentTitle = document.title;
  if (currentTitle !== title) document.title = title;

  return <EditorElement value={fileContent} onChange={(e) => EditorController.UPDATE_EDITOR(e.target.value)} />;
};

export default EditorComponent;
