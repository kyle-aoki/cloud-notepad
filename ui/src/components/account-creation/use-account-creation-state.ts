import { useReducer, KeyboardEvent, ChangeEvent, FormEvent } from 'react';

type Screen = 'USERNAME_INPUT' | 'PASSWORD_INPUT';

export interface AccountCreationState {
  [x: string]: string | boolean;
  username: string;
  password: string;
  screen: Screen;
  triggerCreateAccount: boolean;
}

enum AccountCreationActionType {
  UPDATE_INPUT = 'UPDATE_INPUT',
  USERNAME_TO_PASSWORD_SCREEN = 'USERNAME_TO_PASSWORD_SCREEN',
  PASSWORD_TO_USERNAME_SCREEN = 'PASSWORD_TO_USERNAME_SCREEN',
  TRIGGER_ACCOUNT_CREATION = 'TRIGGER_ACCOUNT_CREATION',
  RESET_ACCOUNT_CREATION_BOOLEAN = 'RESET_ACCOUNT_CREATION_BOOLEAN',
  RESET_ACCOUNT_CREATION_STATE = 'RESET_ACCOUNT_CREATION_STATE',
}

interface AccountCreationAction {
  type: AccountCreationActionType;
  payload?: {
    field: string;
    value: string;
  };
}

const initialState: AccountCreationState = {
  username: '',
  password: '',
  screen: 'USERNAME_INPUT',
  triggerCreateAccount: false,
};

const AccountCreationReducer = (state: AccountCreationState, action: AccountCreationAction) => {
  switch (action.type) {
    case AccountCreationActionType.UPDATE_INPUT:
      if (!action.payload) throw new Error('Missing payload.');
      const field = action.payload.field;
      const value = action.payload.value;
      state[field] = value;
      return { ...state };
    case AccountCreationActionType.USERNAME_TO_PASSWORD_SCREEN:
      state.screen = 'PASSWORD_INPUT';
      return { ...state };
    case AccountCreationActionType.PASSWORD_TO_USERNAME_SCREEN:
      state.screen = 'USERNAME_INPUT';
      state.password = '';
      return { ...state };
    case AccountCreationActionType.TRIGGER_ACCOUNT_CREATION:
      state.triggerCreateAccount = true;
      return { ...state };
    case AccountCreationActionType.RESET_ACCOUNT_CREATION_BOOLEAN:
      state.triggerCreateAccount = false;
      return { ...state };
    case AccountCreationActionType.RESET_ACCOUNT_CREATION_STATE:
      console.log(state);
      return initialState;
    default:
      return state;
  }
};

export const useAccountCreationState = (): [
  AccountCreationState,
  (event: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
  () => void,
  () => void,
  () => void
] => {
  const [state, dispatch] = useReducer(AccountCreationReducer, initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.id;
    const value = event.target.value;
    dispatch({
      type: AccountCreationActionType.UPDATE_INPUT,
      payload: {
        field,
        value,
      },
    });
  };

  const handleNextClick = () => {
    dispatch({ type: AccountCreationActionType.USERNAME_TO_PASSWORD_SCREEN });
  };

  const handleBackArrowClick = () => {
    dispatch({ type: AccountCreationActionType.PASSWORD_TO_USERNAME_SCREEN });
  };

  const triggerAccountCreation = () => {
    dispatch({ type: AccountCreationActionType.TRIGGER_ACCOUNT_CREATION });
  };

  const resetAccountCreationBoolean = () => {
    dispatch({ type: AccountCreationActionType.RESET_ACCOUNT_CREATION_BOOLEAN });
  };

  const resetAccountCreationState = () => {
    dispatch({ type: AccountCreationActionType.RESET_ACCOUNT_CREATION_STATE });
  };

  return [
    state,
    handleInputChange,
    handleNextClick,
    handleBackArrowClick,
    triggerAccountCreation,
    resetAccountCreationBoolean,
    resetAccountCreationState,
  ];
};
