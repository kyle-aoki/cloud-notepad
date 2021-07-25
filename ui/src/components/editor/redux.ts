import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { Executor, init, ReduxAction } from '../../redux/class';
import { FileSystem } from '../file-system/redux';
import { getEditorStateFromLocalStorage, saveEditorStateToLocalStorage, setDocumentTitle } from './util';

export const useEditorState = () => useSelector((state: GlobalState) => state.Editor);

export namespace Editor {
  export interface SHAPE {
    fileContent: string;
    title: string;
  }
  export const INITIAL_STATE: SHAPE = {
    fileContent: '',
    title: 'Untitled - Notepad',
  };
  export const WORKING_INITIAL_STATE: SHAPE = getEditorStateFromLocalStorage() || INITIAL_STATE;

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace UPDATE_EDITOR {
    export const meta = init((state: SHAPE, action) => {
      return { ...state, fileContent: action.payload.value };
    });
  }

  export namespace LOAD_FILE {
    export const meta = init((state: SHAPE, action) => {
      const { fileContent } = action.payload;
      state.fileContent = fileContent;
      return { ...state };
    });
  }

  export namespace SET_TITLE {
    export const meta = init((state: SHAPE, action) => {
      const newTitle = action.payload.title;
      setDocumentTitle(newTitle);
      return { ...state, title: newTitle };
    });
  }

  export namespace ADD_STAR {
    export const meta = init((state: SHAPE, action) => {
      const currentTitle = document.title;
      return { ...state, title: `*${currentTitle}` };
    });
  }

  export namespace SAGA {
    export namespace HANDLE_EDITOR_CHANGE {
      export const meta = init(() => {});
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = WORKING_INITIAL_STATE, action: ReduxAction) {
    let newState;
    switch (action.type) {
      case UPDATE_EDITOR.meta.type:   newState = UPDATE_EDITOR.meta.logic(state, action); break;
      case LOAD_FILE.meta.type:       newState = LOAD_FILE.meta.logic(state, action); break;
      case SET_TITLE.meta.type:       newState = SET_TITLE.meta.logic(state, action); break;
      case ADD_STAR.meta.type:        newState = ADD_STAR.meta.logic(state, action); break;
      default:                        newState = DEFAULT.meta.logic(state, action); break;
    }
    saveEditorStateToLocalStorage(newState);
    return newState;
  }

  export class Instance extends Executor {
    UPDATE_EDITOR = (value: string) => this.exec(UPDATE_EDITOR.meta.createAction({ value }));
    LOAD_FILE = (fileContent: string) => this.exec(LOAD_FILE.meta.createAction({ fileContent }));
    SET_TITLE = (title: string) => this.exec(SET_TITLE.meta.createAction({ title }));
    ADD_STAR = () => this.exec(ADD_STAR.meta.createAction());

    SAGA = new (class extends Executor {
      HANDLE_EDITOR_CHANGE = (newEditorValue: string, fileSaveState: FileSystem.FileSaveState) =>
        this.exec(SAGA.HANDLE_EDITOR_CHANGE.meta.createAction({ newEditorValue, fileSaveState }));
    })(this.exec);
  }
}
