import { useEffect } from 'react';
import { Notif, useNotifState } from './redux';
import { StandardToast } from './standard-toast';

// prettier-ignore
export default function useNotifications() {
  const NotifState = useNotifState();

  useEffect(() => {
    if (NotifState.count === 0) return;

    switch (NotifState.type as Notif.Type) {
      case Notif.Type.ERROR:  return StandardToast(NotifState.text);
      case Notif.Type.INFO:   return StandardToast(NotifState.text);
    }
  }, [NotifState.count, NotifState.type, NotifState.text]); 
}
