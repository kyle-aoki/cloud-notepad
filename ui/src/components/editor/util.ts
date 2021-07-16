import { Editor } from './redux';

const EDITOR_STATE_LOCAL_STORAGE_KEY = 'EDITOR_STATE' as const;

export function saveEditorStateToLocalStorage(editorState: Editor.SHAPE) {
  localStorage.setItem(EDITOR_STATE_LOCAL_STORAGE_KEY, JSON.stringify(editorState));
}

export function getEditorStateFromLocalStorage(): Editor.SHAPE {
  const editorStateString = localStorage.getItem(EDITOR_STATE_LOCAL_STORAGE_KEY);
  if (!editorStateString) return Editor.INITIAL_STATE;
  const editorState = JSON.parse(editorStateString);
  return editorState;
}
