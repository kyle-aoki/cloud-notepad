import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../..';
import { NotificationActions, NotificationState, NotificationType } from './reducer';

export const useNotificationState = () => {
  return useSelector((state: GlobalState) => state.notifications);
};

export const useNotificationDispatch = (): NotificationDispatch => {
  const dispatch = useDispatch();
  return new NotificationDispatch(dispatch);
};

export default class NotificationDispatch {
  dispatch: Dispatch<any>;

  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }

  PUSH_NOTIFICATION(type: NotificationType, text: string) {
    this.dispatch({
      type: NotificationActions.PUSH_NOTIFICATION,
      payload: {
        notificationType: type,
        notificationText: text,
      },
    });
  }
}

export class NotificationActionCreator {
  static PUSH_NOTIFICATION(text: string, type: NotificationType) {
    return { type: NotificationActions.PUSH_NOTIFICATION, payload: { text, type } };
  }

  static NETWORK_ERROR() {
    return { type: NotificationActions.NETWORK_ERROR };
  }
  static GENERIC_ERROR() {
    return { type: NotificationActions.GENERIC_ERROR };
  }
}
