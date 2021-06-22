import { useEffect } from 'react';
import AccountCreationControl from '../../redux/reducers/create-account/control';

export default function useCloseModalOnDone(AccountCreationControl: AccountCreationControl) {
  useEffect(() => {
    if (AccountCreationControl.state.done) {
      AccountCreationControl.CLOSE_MODAL();
    }
  }, [AccountCreationControl.state.done]);
}
