import { NotificationState, NotificationAction, NotificationType } from './reducer';

export function PUSH_NOTIFICATION(state: NotificationState, action: NotificationAction) {
  state.count += 1;
  state.text = action.payload.text;
  state.type = action.payload.type;
  return { ...state };
}

export function NETWORK_ERROR(state: NotificationState, action: NotificationAction) {
  state.count += 1;
  state.text = "Network Error.";
  state.type = NotificationType.ERROR;
  return { ...state };
}

export function GENERIC_ERROR(state: NotificationState, action: NotificationAction) {
  state.count += 1;
  state.text = "Something went wrong.";
  state.type = NotificationType.ERROR;
  return { ...state };
}
