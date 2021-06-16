import React, { FC } from "react";
import styled from "styled-components";

interface EditorProps {}

interface EditorElement {}

const EditorElement = styled.textarea.attrs((props: EditorElement) => ({
  spellCheck: false,
  wrap: "off",
}))`
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  font-family: "Consolas";
  outline: none;
  border: none;
  resize: none;
  padding: 2px 4px;
  overflow: scroll;
  cursor: auto;
`;

const Editor: FC<EditorProps> = () => {
  return (
    <>
      <EditorElement />
    </>
  );
};

export default Editor;
