import { useEffect } from 'react';
import AccountCreationControl from './redux/control';
import NotificationDispatch from '../../notifications/redux/control';

export default function useAccountCreationNotifs(
  AccountCreationControl: AccountCreationControl,
  NotificationControl: NotificationDispatch
) {
  useEffect(() => {
    if (AccountCreationControl.state.done) {
      AccountCreationControl.CLOSE_MODAL();
    }
    NotificationControl.PUSH_NOTIFICATION(
      AccountCreationControl.state.notificationType,
      AccountCreationControl.state.notificationText
    );
  }, [AccountCreationControl.state.notificationCount]);
}
