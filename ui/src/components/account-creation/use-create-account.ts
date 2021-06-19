import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { CreateAccountModalActions } from '../../redux/reducers/create-account/reducer';

import { AccountCreationState } from './use-account-creation-state';

const createAccountFetcher = async (username: string, password: string) => {
  const response = await fetch('/api/create-user', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
      api_key: '123',
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
};

const fetchCreateAccount = async (state: AccountCreationState, dispatch: Dispatch) => {
  const res = await createAccountFetcher(state.username, state.password);
  if (res.ok) {
    dispatch({ type: CreateAccountModalActions.CLOSE_CREATE_ACCOUNT_MODAL });
    return;
  }
};

export const useCreateAccount = (
  state: AccountCreationState,
  dispatch: Dispatch,
  resetAccountCreationBoolean: Function
) => {
  useEffect(() => {
    if (!state.triggerCreateAccount) return;
    fetchCreateAccount(state, dispatch);
    resetAccountCreationBoolean();
  }, [state]);
};
