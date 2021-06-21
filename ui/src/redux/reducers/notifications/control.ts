import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { GlobalState } from '../../..';
import { NotificationActions, NotificationState, NotificationType } from './reducer';

export const useNotificationControl = (): NotificationControl => {
  const dispatch = useDispatch();
  const state = useSelector((state: GlobalState) => state.notifications);
  return new NotificationControl(dispatch, state);
};

export default class NotificationControl {
  dispatch: Dispatch<any>;
  state: NotificationState;

  constructor(dispatch: Dispatch<any>, state: NotificationState) {
    this.dispatch = dispatch;
    this.state = state;
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
