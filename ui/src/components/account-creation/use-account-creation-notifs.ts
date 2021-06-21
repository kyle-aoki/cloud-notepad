import { useEffect } from 'react';
import AccountCreationControl from '../../redux/reducers/create-account/control';
import NotificationControl from '../../redux/reducers/notifications/control';

export default function useAccountCreationNotifs(
  AccountCreationControl: AccountCreationControl,
  NotificationControl: NotificationControl
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
