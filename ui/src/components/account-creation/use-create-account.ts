import { useEffect, useState } from 'react';
import { hostURL } from '../../constants/host';
import { AccountCreationState } from './use-account-creation-state';

const createAccountFetcher = async (username: string, password: string) => {
  const body = JSON.stringify({ username, password });
  console.log(body);
  const response = await fetch(hostURL + '/api/create-user', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
      api_key: '123',
    },
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
};
const fetchCreateAccount = async () => {};
export const useCreateAccount = (state: AccountCreationState) => {
  useEffect(() => {
    if (!state.triggerCreateAccount) return;
    createAccountFetcher(state.username, state.password);
  }, [state]);
};
