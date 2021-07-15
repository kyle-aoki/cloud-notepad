import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { ExecuteFunction, Executor, init, ReduxAction } from '../../redux/class';

export const useFileSystemState = () => useSelector((state: GlobalState) => state.FileSystem);

export namespace FileSystem {
  export interface SHAPE {
    fileSystemOpen: boolean;
    userDir: any;
    path: string[];
    recent: string[];
    selected: string;
    lastClickTime: number;
  }
  export const INITIAL_STATE: SHAPE = {
    fileSystemOpen: false,
    userDir: undefined,
    path: [],
    recent: [],
    selected: '',
    lastClickTime: 0,
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace OPEN_FILE_SYSTEM {
    export const meta = init((state: SHAPE, action) => ({ ...INITIAL_STATE, fileSystemOpen: true }));
  }

  export namespace CLOSE_FILE_SYSTEM {
    export const meta = init((state: SHAPE, action) => ({ ...INITIAL_STATE, fileSystemOpen: false }));
  }

  export namespace SET_USER_DIR {
    export const meta = init((state: SHAPE, action) => {
      if (!action.payload) return { ...state };

      state.userDir = action.payload.userDir;
      return { ...state };
    });
  }

  export namespace CREATE_FILE {
    export const meta = init((state: SHAPE, action) => {
      return { ...state };
    });
  }

  export namespace SAVE_FILE {
    export const meta = init((state: SHAPE, action) => {
      return { ...state };
    });
  }

  export namespace DELETE_FILE {
    export const meta = init((state: SHAPE, action) => {
      return { ...state };
    });
  }

  export namespace BACK_BUTTON_PRESSED {
    export const meta = init((state: SHAPE, action) => {
      if (state.path.length === 0) return { ...state };
      state.recent = [...state.recent, state.path.pop() as string];
      state.path = [...state.path];
      return { ...state };
    });
  }

  export namespace FORWARD_BUTTON_PRESSED {
    export const meta = init((state: SHAPE, action) => {
      if (state.recent.length === 0) return { ...state };
      state.path = [...state.path, state.recent.pop() as string];
      state.recent = [...state.recent];
      return { ...state };
    });
  }

  export namespace FOLDER_CLICKED {
    export const meta = init((state: SHAPE, action) => {
      const folderName = action.payload.folderName;
      state.path.push(folderName);
      state.recent = [];
      state.path = [...state.path];

      return { ...state };
    });
  }

  export namespace SELECT_OBJECT {
    export const meta = init((state: SHAPE, action) => {
      const objectName = action.payload.objectName;
      state.selected = objectName;
      return { ...state };
    });
  }

  export namespace SET_NEW_LAST_CLICK_TIME {
    export const meta = init((state: SHAPE, action) => {
      const newLastClick = action.payload.newLastClick;
      state.lastClickTime = newLastClick;
      return { ...state };
    });
  }

  export namespace SAGA {
    export namespace GET_USER_DIR {
      export const meta = init(() => {});
    }
    export namespace HANDLE_FOLDER_CLICK {
      export const meta = init(() => {});
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case OPEN_FILE_SYSTEM.meta.type:            return OPEN_FILE_SYSTEM.meta.logic(state, action);
      case CLOSE_FILE_SYSTEM.meta.type:           return CLOSE_FILE_SYSTEM.meta.logic(state, action);
      case SET_USER_DIR.meta.type:                return SET_USER_DIR.meta.logic(state, action);
      case CREATE_FILE.meta.type:                 return CREATE_FILE.meta.logic(state, action);
      case SAVE_FILE.meta.type:                   return SAVE_FILE.meta.logic(state, action);
      case DELETE_FILE.meta.type:                 return DELETE_FILE.meta.logic(state, action);
      case BACK_BUTTON_PRESSED.meta.type:         return BACK_BUTTON_PRESSED.meta.logic(state, action);
      case FORWARD_BUTTON_PRESSED.meta.type:      return FORWARD_BUTTON_PRESSED.meta.logic(state, action);
      case FOLDER_CLICKED.meta.type:              return FOLDER_CLICKED.meta.logic(state, action);
      case SELECT_OBJECT.meta.type:               return SELECT_OBJECT.meta.logic(state, action);
      case SET_NEW_LAST_CLICK_TIME.meta.type:     return SET_NEW_LAST_CLICK_TIME.meta.logic(state, action);
      default:                                    return DEFAULT.meta.logic(state, action);
    }
  }

  export class Instance extends Executor {
    OPEN_FILE_SYSTEM = () => this.exec(OPEN_FILE_SYSTEM.meta.createAction());
    CLOSE_FILE_SYSTEM = () => this.exec(CLOSE_FILE_SYSTEM.meta.createAction());
    SET_USER_DIR = (userDir: any) => this.exec(SET_USER_DIR.meta.createAction({ userDir }));
    CREATE_FILE = () => this.exec(CREATE_FILE.meta.createAction());
    SAVE_FILE = () => this.exec(SAVE_FILE.meta.createAction());
    DELETE_FILE = () => this.exec(DELETE_FILE.meta.createAction());
    BACK_BUTTON_PRESSED = () => this.exec(BACK_BUTTON_PRESSED.meta.createAction());
    FORWARD_BUTTON_PRESSED = () => this.exec(FORWARD_BUTTON_PRESSED.meta.createAction());
    FOLDER_CLICKED = (folderName: string) => this.exec(FOLDER_CLICKED.meta.createAction({ folderName }));
    SELECT_OBJECT = (objectName: string) => this.exec(SELECT_OBJECT.meta.createAction({ objectName }));

    SET_NEW_LAST_CLICK_TIME = (newLastClick: number) => {
      return this.exec(SET_NEW_LAST_CLICK_TIME.meta.createAction({ newLastClick }));
    };

    SAGA = new (class extends Executor {
      GET_USER_DIR = () => this.exec(SAGA.GET_USER_DIR.meta.createAction());
      HANDLE_FOLDER_CLICK = (lastClickTime: number, folderName: string) => {
        this.exec(SAGA.HANDLE_FOLDER_CLICK.meta.createAction({ lastClickTime, folderName }));
      };
    })(this.exec);
  }
}
