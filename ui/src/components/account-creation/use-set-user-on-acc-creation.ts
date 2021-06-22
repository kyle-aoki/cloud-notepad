import { useEffect } from 'react';
import { CurrentUserControl } from '../../redux/reducers/current-user/control';
import AccountCreationControl from '../../redux/reducers/create-account/control';

export const useSetUserOnAccountCreation = (
  CurrentUserControl: CurrentUserControl,
  AccountCreationControl: AccountCreationControl
) => {
  useEffect(() => {
    CurrentUserControl.SET_CURRENT_USER(AccountCreationControl.state.newUserUsername);
  }, [AccountCreationControl.state.newUserUsername]);
};
