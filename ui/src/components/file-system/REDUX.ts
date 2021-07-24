import { useSelector } from 'react-redux';
import { GlobalState } from '../..';
import { DISALLOWED_FOLDER_NAME_CHARACTERS } from '../../constants';
import { ExecuteFunction, Executor, init, ReduxAction } from '../../redux/class';
import { dirInitialState } from './user-dir';
import { getTotalMemoryFromLocalStorage, setTotalMemoryInLocalStorage } from './util';

export const useFileSystemState = () => useSelector((state: GlobalState) => state.FileSystem);

export namespace FileSystem {
  export enum Mode {
    OPEN_FILE,
    SAVE_NEW_FILE,
  }
  export interface SHAPE {
    [x: string]: any;
    fileSystemOpen: boolean;
    userDir: any;
    userDirLoading: boolean;
    path: string[];
    recent: string[];
    selected: string;
    lastClickTime: number;
    mode: Mode;
    newFileName: string;
    newFileExtension: string;
    saveFileLoading: boolean;
    totalMemory: number;
    creatingFolder: boolean;
    selectedOnCreatingFolder: string;
    newFolderName: string;
    newFolderLoading: boolean;
    fileOpening: string;
    fileSuccessfullySaved: boolean;
  }
  export const INITIAL_STATE: SHAPE = {
    fileSystemOpen: false,
    userDir: [...dirInitialState],
    userDirLoading: true,
    path: [],
    recent: [],
    selected: '',
    lastClickTime: 0,
    mode: Mode.OPEN_FILE,
    newFileName: '',
    newFileExtension: '.txt',
    saveFileLoading: false,
    totalMemory: getTotalMemoryFromLocalStorage(),
    creatingFolder: false,
    selectedOnCreatingFolder: '',
    newFolderName: '',
    newFolderLoading: false,
    fileOpening: '',
    fileSuccessfullySaved: false,
  };

  export namespace DEFAULT {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
  }

  export namespace OPEN_FILE_SYSTEM {
    export const meta = init((state: SHAPE, action) => {
      const mode = action.payload.mode;
      return { ...INITIAL_STATE, mode, fileSystemOpen: true };
    });
  }

  export namespace CLOSE_FILE_SYSTEM {
    export const meta = init((state: SHAPE, action) => ({
      ...INITIAL_STATE,
      userDir: [...dirInitialState],
      fileSystemOpen: false,
    }));
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

  export namespace FILE_CLICKED {
    export const meta = init((state: SHAPE, action) => ({ ...state }));
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

  export namespace UPDATE_FIELD {
    export const meta = init((state: SHAPE, action) => {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    });
  }

  export namespace START_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, saveFileLoading: true }));
  }

  export namespace STOP_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, saveFileLoading: false }));
  }

  export namespace SET_TOTAL_MEMORY {
    export const meta = init((state: SHAPE, action) => {
      const totalMemory = action.payload.memory;
      setTotalMemoryInLocalStorage(totalMemory);
      return { ...state, totalMemory };
    });
  }

  export namespace START_FOLDER_CREATION_PROCESS {
    export const meta = init((state: SHAPE, action) => ({
      ...state,
      selected: '',
      creatingFolder: true,
      selectedOnCreatingFolder: '',
    }));
  }

  export namespace STOP_FOLDER_CREATION_PROCESS {
    export const meta = init((state: SHAPE, action) => ({ ...state, creatingFolder: false }));
  }

  export namespace UPDATE_FOLDER_NAME {
    export const meta = init((state: SHAPE, action) => {
      const { newFolderName } = action.payload;
      const newFolderNameChars = newFolderName.split('');
      for (let i = 0; i < newFolderNameChars.length; i += 1) {
        if (!DISALLOWED_FOLDER_NAME_CHARACTERS.includes(newFolderNameChars[i])) continue;
        return { ...state };
      }
      return { ...state, newFolderName };
    });
  }

  export namespace START_NEW_FOLDER_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, newFolderLoading: true }));
  }
  export namespace STOP_NEW_FOLDER_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, newFolderLoading: false }));
  }

  export namespace START_USER_DIR_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, userDirLoading: true }));
  }
  export namespace STOP_USER_DIR_LOADING {
    export const meta = init((state: SHAPE, action) => ({ ...state, userDirLoading: false }));
  }

  export namespace SET_FILE_OPENING {
    export const meta = init((state: SHAPE, action) => ({ ...state, fileOpening: action.payload.fileOpening }));
  }

  export namespace SET_FILE_SUCCESSFULLY_SAVED {
    export const meta = init((state: SHAPE, action) => ({
      ...state,
      fileSuccessfullySaved: action.payload.fileSuccessfullySaved,
    }));
  }

  export namespace SAGA {
    export namespace GET_USER_DIR {
      export const meta = init(() => {});
    }
    export namespace HANDLE_FOLDER_CLICK {
      export const meta = init(() => {});
    }
    export namespace SAVE_NEW_FILE {
      export const meta = init(() => {});
    }
    export namespace HANDLE_FILE_CLICK {
      export const meta = init(() => {});
    }
    export namespace CREATE_FOLDER {
      export const meta = init(() => {});
    }
  }

  // prettier-ignore
  export function REDUCER(state: SHAPE = INITIAL_STATE, action: ReduxAction) {
    switch (action.type) {
      case OPEN_FILE_SYSTEM.meta.type:                    return OPEN_FILE_SYSTEM.meta.logic(state, action);
      case CLOSE_FILE_SYSTEM.meta.type:                   return CLOSE_FILE_SYSTEM.meta.logic(state, action);
      case SET_USER_DIR.meta.type:                        return SET_USER_DIR.meta.logic(state, action);
      case CREATE_FILE.meta.type:                         return CREATE_FILE.meta.logic(state, action);
      case SAVE_FILE.meta.type:                           return SAVE_FILE.meta.logic(state, action);
      case DELETE_FILE.meta.type:                         return DELETE_FILE.meta.logic(state, action);
      case BACK_BUTTON_PRESSED.meta.type:                 return BACK_BUTTON_PRESSED.meta.logic(state, action);
      case FORWARD_BUTTON_PRESSED.meta.type:              return FORWARD_BUTTON_PRESSED.meta.logic(state, action);
      case FOLDER_CLICKED.meta.type:                      return FOLDER_CLICKED.meta.logic(state, action);
      case SELECT_OBJECT.meta.type:                       return SELECT_OBJECT.meta.logic(state, action);
      case SET_NEW_LAST_CLICK_TIME.meta.type:             return SET_NEW_LAST_CLICK_TIME.meta.logic(state, action);
      case UPDATE_FIELD.meta.type:                        return UPDATE_FIELD.meta.logic(state, action);
      case START_LOADING.meta.type:                       return START_LOADING.meta.logic(state, action);
      case STOP_LOADING.meta.type:                        return STOP_LOADING.meta.logic(state, action);
      case SET_TOTAL_MEMORY.meta.type:                    return SET_TOTAL_MEMORY.meta.logic(state, action);
      case START_FOLDER_CREATION_PROCESS.meta.type:       return START_FOLDER_CREATION_PROCESS.meta.logic(state, action);
      case STOP_FOLDER_CREATION_PROCESS.meta.type:        return STOP_FOLDER_CREATION_PROCESS.meta.logic(state, action);
      case UPDATE_FOLDER_NAME.meta.type:                  return UPDATE_FOLDER_NAME.meta.logic(state, action);
      case START_NEW_FOLDER_LOADING.meta.type:            return START_NEW_FOLDER_LOADING.meta.logic(state, action);
      case STOP_NEW_FOLDER_LOADING.meta.type:             return STOP_NEW_FOLDER_LOADING.meta.logic(state, action);
      case START_USER_DIR_LOADING.meta.type:              return START_USER_DIR_LOADING.meta.logic(state, action);
      case STOP_USER_DIR_LOADING.meta.type:               return STOP_USER_DIR_LOADING.meta.logic(state, action);
      case SET_FILE_OPENING.meta.type:                    return SET_FILE_OPENING.meta.logic(state, action);
      case SET_FILE_SUCCESSFULLY_SAVED.meta.type:         return SET_FILE_SUCCESSFULLY_SAVED.meta.logic(state, action);
    }
    return DEFAULT.meta.logic(state, action);
  }

  // prettier-ignore
  export class Instance extends Executor {
    OPEN_FILE_SYSTEM = (mode: Mode) => this.exec(OPEN_FILE_SYSTEM.meta.createAction({ mode }));
    CLOSE_FILE_SYSTEM = () => this.exec(CLOSE_FILE_SYSTEM.meta.createAction());
    SET_USER_DIR = (userDir: any) => this.exec(SET_USER_DIR.meta.createAction({ userDir }));
    CREATE_FILE = () => this.exec(CREATE_FILE.meta.createAction());
    SAVE_FILE = () => this.exec(SAVE_FILE.meta.createAction());
    DELETE_FILE = () => this.exec(DELETE_FILE.meta.createAction());
    BACK_BUTTON_PRESSED = () => this.exec(BACK_BUTTON_PRESSED.meta.createAction());
    FORWARD_BUTTON_PRESSED = () => this.exec(FORWARD_BUTTON_PRESSED.meta.createAction());
    FOLDER_CLICKED = (folderName: string) => this.exec(FOLDER_CLICKED.meta.createAction({ folderName }));
    SELECT_OBJECT = (objectName: string) => this.exec(SELECT_OBJECT.meta.createAction({ objectName }));
    UPDATE_FIELD = (field: string, value: string) => this.exec(UPDATE_FIELD.meta.createAction({ field, value }));
    START_LOADING = () => this.exec(START_LOADING.meta.createAction());
    STOP_LOADING = () => this.exec(STOP_LOADING.meta.createAction());
    SET_TOTAL_MEMORY = (memory: number) => this.exec(SET_TOTAL_MEMORY.meta.createAction({ memory }));
    SET_NEW_LAST_CLICK_TIME = (newLastClick: number) => this.exec(SET_NEW_LAST_CLICK_TIME.meta.createAction({ newLastClick }));
    START_FOLDER_CREATION_PROCESS = () => this.exec(START_FOLDER_CREATION_PROCESS.meta.createAction());
    STOP_FOLDER_CREATION_PROCESS = () => this.exec(STOP_FOLDER_CREATION_PROCESS.meta.createAction());
    UPDATE_FOLDER_NAME = (newFolderName: string) => this.exec(UPDATE_FOLDER_NAME.meta.createAction({ newFolderName }));
    START_NEW_FOLDER_LOADING = () => this.exec(START_NEW_FOLDER_LOADING.meta.createAction());
    STOP_NEW_FOLDER_LOADING = () => this.exec(STOP_NEW_FOLDER_LOADING.meta.createAction());
    START_USER_DIR_LOADING = () => this.exec(START_USER_DIR_LOADING.meta.createAction());
    STOP_USER_DIR_LOADING = () => this.exec(STOP_USER_DIR_LOADING.meta.createAction());
    SET_FILE_OPENING = (fileOpening: string) => this.exec(SET_FILE_OPENING.meta.createAction({ fileOpening }));
    SET_FILE_SUCCESSFULLY_SAVED = (fileSuccessfullySaved: boolean) => this.exec(SET_FILE_SUCCESSFULLY_SAVED.meta.createAction({ fileSuccessfullySaved }));

    SAGA = new (class extends Executor {
      GET_USER_DIR = () => this.exec(SAGA.GET_USER_DIR.meta.createAction());
      HANDLE_FOLDER_CLICK = (lastClickTime: number, folderName: string) => {
        return this.exec(SAGA.HANDLE_FOLDER_CLICK.meta.createAction({ lastClickTime, folderName }));
      };
      SAVE_NEW_FILE = (path: string[], newFileName: string, newFileExtension: string, fileContent: string) => {
        return this.exec(SAGA.SAVE_NEW_FILE.meta.createAction({ path, newFileName, newFileExtension, fileContent }));
      };
      HANDLE_FILE_CLICK = (lastClickTime: number, fileName: string, filePath: string[]) => {
        return this.exec(SAGA.HANDLE_FILE_CLICK.meta.createAction({ lastClickTime, fileName, filePath }));
      };
      CREATE_FOLDER = (path: string[], newFolderName: string) => this.exec(SAGA.CREATE_FOLDER.meta.createAction({ path, newFolderName }));
    })(this.exec);
  }
}
