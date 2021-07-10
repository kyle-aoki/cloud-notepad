import { useEffect } from 'react';
import { useNotificationState } from './redux/control';
import { NotificationType } from './redux/reducer';
import { StandardToast } from './standard-toast';

export default function useNotifications() {
  const NotificationState = useNotificationState();

  useEffect(() => {
    if (!NotificationState.type) return;
    if (!NotificationState.text) return;

    // prettier-ignore
    switch (NotificationState.type) {
      case NotificationType.ERROR: return StandardToast(NotificationState.text);
      case NotificationType.INFO: return StandardToast(NotificationState.text);
    }
  }, [NotificationState.count, NotificationState.type, NotificationState.text]); 
}
