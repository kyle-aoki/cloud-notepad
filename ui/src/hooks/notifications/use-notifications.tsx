import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNotificationControl } from '../../redux/reducers/notifications/control';
import { NotificationType } from '../../redux/reducers/notifications/reducer';
import { UsernameDisplay } from '../../ui/username-font';
import { LoggedInAsNotification } from './logged-in-as';
import { StandardToast } from './standard-toast';

export default function useNotifications() {
  const NotificationControl = useNotificationControl();
  useEffect(() => {
    if (!NotificationControl.state.notificationType) return;
    if (!NotificationControl.state.notificationText) return;
    switch (NotificationControl.state.notificationType) {
      case NotificationType.ERROR:
        StandardToast(NotificationControl.state.notificationText);
        break;
      case NotificationType.INFO:
        StandardToast(NotificationControl.state.notificationText);
        break;
      default:
        return;
    }
  }, [NotificationControl.state.notificationCount]);
}
