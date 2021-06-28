import { useEffect } from 'react';
import AccountCreationControl from './redux/control';
import { AccountControl } from '../taskbar/menu/account/redux/control';

export const useSetUserOnAccountCreation = (
  AccountControl: AccountControl,
  AccountCreationControl: AccountCreationControl
) => {
  useEffect(() => {
    if (AccountCreationControl.state.done === false) return;
    AccountControl.SET_USER(AccountCreationControl.state.newUserUsername);
  }, [AccountCreationControl.state.done]);
};
