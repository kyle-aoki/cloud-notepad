import { useReducer, KeyboardEvent, ChangeEvent, FormEvent } from 'react';

export interface AccountCreationState {
  [x: string]: string;
  username: string;
  password: string;
}

enum AccountCreationActionType {
  UPDATE_INPUT,
}

interface AccountCreationAction {
  type: AccountCreationActionType;
  payload: {
    field: string;
    value: string;
  };
}

const initialState = {
  username: '',
  password: '',
};

const AccountCreationReducer = (state: AccountCreationState, action: AccountCreationAction) => {
  switch (action.type) {
    case AccountCreationActionType.UPDATE_INPUT:
      const field = action.payload.field;
      const value = action.payload.value;
      state[field] = value;
      return { ...state };
    default:
      return state;
  }
};

export const useAccountCreationState = (): [
  AccountCreationState,
  (event: ChangeEvent<HTMLInputElement>) => void
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
  return [state, handleInputChange];
};
