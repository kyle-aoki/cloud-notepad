import { useEffect } from 'react';
import { useNotificationState } from './redux/control';
import { NotificationType } from './redux/reducer';
import { StandardToast } from './standard-toast';

export default function useNotifications() {
  const NotificationState = useNotificationState();
  useEffect(() => {
    if (!NotificationState.type) return;
    if (!NotificationState.text) return;

    switch (NotificationState.type) {
      case NotificationType.ERROR:
        StandardToast(NotificationState.text);
        break;
      case NotificationType.INFO:
        StandardToast(NotificationState.text);
        break;
    }
  }, [NotificationState.count]);
}
