import { NotificationState, NotificationAction } from './reducer';

export function PUSH_NOTIFICATION(state: NotificationState, action: NotificationAction) {
  state.notificationCount += 1;
  state.notificationText = action.payload.notificationText;
  state.notificationType = action.payload.notificationType;
  return { ...state };
}
