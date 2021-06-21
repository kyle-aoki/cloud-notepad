import { useEffect } from 'react';
import toast from 'react-hot-toast';
import NotificationControl from '../redux/reducers/notifications/control';
import { NotificationType } from '../redux/reducers/notifications/reducer';

export default function useNotifications(NotificationControl: NotificationControl) {
  useEffect(() => {
    if (!NotificationControl.state.notificationType) return;
    if (!NotificationControl.state.notificationText) return;
    switch (NotificationControl.state.notificationType) {
      case NotificationType.ERROR:
        toast.error(NotificationControl.state.notificationText, {
          duration: 4000,
          position: 'top-right',
          style: {
            whiteSpace: 'pre-line',
          },
        });
        break;
      case NotificationType.INFO:
        toast.success(NotificationControl.state.notificationText, {
          duration: 4000,
          position: 'top-right',
          style: {
            whiteSpace: 'pre-line',
          },
        });
        break;
      default:
        return;
    }
  }, [NotificationControl.state.notificationCount]);
}
