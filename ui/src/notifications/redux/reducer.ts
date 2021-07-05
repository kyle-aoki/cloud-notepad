import { ReactNode } from 'react';
import { Reducer } from 'redux';
import { GENERIC_ERROR, NETWORK_ERROR, PUSH_NOTIFICATION } from './functions';

// Error, Info, Warn, etc.
export enum NotificationType {
  INFO = 'NotificationType.INFO',
  ERROR = 'NotificationType.ERROR',
}

export interface NotificationState {
  count: number;
  type: NotificationType;
  text: string;
}

export const notificationInitialState: NotificationState = {
  count: 0,
  type: NotificationType.INFO,
  text: '',
};

export enum NotificationActions {
  PUSH_NOTIFICATION = "NotificationActions.PUSH_NOTIFICATION",
  NETWORK_ERROR = 'NotificationActions.NETWORK_ERROR',
  GENERIC_ERROR = 'NotificationActions.GENERIC_ERROR',
}

export interface NotificationAction {
  type: NotificationActions;
  payload: { type: NotificationType; text: string };
}

export const notificationReducer: Reducer<NotificationState, NotificationAction> = (
  state = notificationInitialState,
  action
) => {
  switch (action.type) {
    case NotificationActions.PUSH_NOTIFICATION:
      return PUSH_NOTIFICATION(state, action);
    case NotificationActions.NETWORK_ERROR:
      return NETWORK_ERROR(state, action);
    case NotificationActions.GENERIC_ERROR:
      return GENERIC_ERROR(state, action);
    default:
      return state;
  }
};
