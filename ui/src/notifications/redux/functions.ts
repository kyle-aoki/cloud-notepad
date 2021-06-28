import { NotificationState, NotificationAction } from './reducer';

export function PUSH_NOTIFICATION(state: NotificationState, action: NotificationAction) {
  state.count += 1;
  state.text = action.payload.text;
  state.type = action.payload.type;
  return { ...state };
}
