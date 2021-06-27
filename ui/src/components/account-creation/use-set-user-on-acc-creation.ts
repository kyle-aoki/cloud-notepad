import { useEffect } from 'react';
import AccountCreationControl from '../../redux/reducers/create-account/control';
import { AccountControl } from '../../redux/reducers/account/control';

export const useSetUserOnAccountCreation = (
  AccountControl: AccountControl,
  AccountCreationControl: AccountCreationControl
) => {
  useEffect(() => {
    if (AccountCreationControl.state.done === false) return;
    AccountControl.SET_USER(AccountCreationControl.state.newUserUsername);
  }, [AccountCreationControl.state.done]);
};
