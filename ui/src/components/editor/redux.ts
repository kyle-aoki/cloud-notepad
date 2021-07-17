import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { Executor, init, ReduxAction } from '../../redux/class';
import { getEditorStateFromLocalStorage, saveEditorStateToLocalStorage } from './util';

export const useEditorState = () => useSelector((state: GlobalState) => state.Editor);

export namespace Editor {
  export interface SHAPE {
    fileContent: string;
    saved: boolean;
    title: string;
    newFile: boolean;
  }
  export const INITIAL_STATE: SHAPE = {
    fileContent: '',
    saved: true,
    title: 'Untitled - Notepad',
    newFile: true,
  };
  export const WORKING_INITIAL_STATE: SHAPE = getEditorStateFromLocalStorage() || INITIAL_STATE;

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace UPDATE_EDITOR {
    export const meta = init((state: SHAPE, action) => {
      const newValue = action.payload.value;
      if (state.saved) {
        state.title = '*' + state.title;
        state.saved = false;
      }

      const newState = { ...state, fileContent: newValue };

      saveEditorStateToLocalStorage(newState);
      return newState;
    });
  }

  export namespace SAVE_NEW_FILE {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace LOAD_FILE {
    export const meta = init((state: SHAPE, action) => {
      const {fileContent} = action.payload;
      state.fileContent = fileContent;
      return { ...state };
    });
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = WORKING_INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case UPDATE_EDITOR.meta.type:   return UPDATE_EDITOR.meta.logic(state, action);
      case LOAD_FILE.meta.type:       return LOAD_FILE.meta.logic(state, action);
      default:                        return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    UPDATE_EDITOR = (value: string) => this.exec(UPDATE_EDITOR.meta.createAction({ value }));
    LOAD_FILE = (fileContent: string) => this.exec(LOAD_FILE.meta.createAction({ fileContent }));

    SAGA = new (class extends Executor {
      SAVE_NEW_FILE = () => this.exec(SAVE_NEW_FILE.meta.createAction());
    })(this.exec);
  }
}
