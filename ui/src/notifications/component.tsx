import { ToastContainer, Flip } from 'react-toastify';
import useNotifications from './use-notifications';

const Notifications = () => {
  useNotifications();
  return <ToastContainer transition={Flip} />;
};

export default Notifications;
