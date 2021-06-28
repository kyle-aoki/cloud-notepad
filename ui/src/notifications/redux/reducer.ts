import { ReactNode } from 'react';
import { Reducer } from 'redux';
import { PUSH_NOTIFICATION } from './functions';

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
  PUSH_NOTIFICATION,
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
    default:
      return state;
  }
};
