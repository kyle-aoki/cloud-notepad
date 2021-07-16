import { useEffect } from 'react';
import { Notif, useNotifState } from './redux';
import { StandardToast } from './standard-toast';

// prettier-ignore
export default function useNotifications() {
  const { count, type, text } = useNotifState();

  useEffect(() => {
    if (count === 0) return;

    switch (type as Notif.Type) {
      case Notif.Type.ERROR:  return StandardToast(text);
      case Notif.Type.INFO:   return StandardToast(text);
    }
  }, [count, type, text]); 
}
