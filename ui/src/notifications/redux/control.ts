import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../..';
import { Actuator } from '../../redux/class';
import { NotificationActions, NotificationState, NotificationType } from './reducer';

export const useNotificationState = () => {
  return useSelector((state: GlobalState) => state.notifications);
};

export default class NotificationControl extends Actuator {
  PUSH_NOTIFICATION(type: NotificationType, text: string) {
    return this.exec({
      type: NotificationActions.PUSH_NOTIFICATION,
      payload: {
        notificationType: type,
        notificationText: text,
      },
    });
  }

  PUSH_INFO(text: any) {
    return this.exec({
      type: NotificationActions.PUSH_NOTIFICATION,
      payload: { text, type: NotificationType.INFO },
    });
  }
  PUSH_ERROR(text: any) {
    return this.exec({
      type: NotificationActions.PUSH_NOTIFICATION,
      payload: { text, type: NotificationType.ERROR },
    });
  }

  NETWORK_ERROR() {
    return this.exec({ type: NotificationActions.NETWORK_ERROR });
  }
  GENERIC_ERROR() {
    return this.exec({ type: NotificationActions.GENERIC_ERROR });
  }
}
