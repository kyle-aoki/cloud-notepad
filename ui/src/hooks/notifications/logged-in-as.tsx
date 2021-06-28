import { toast } from 'react-toastify';
import { UsernameFont } from '../../ui/username-font';

export const LoggedInAsNotification = (username: string) => {
  toast.info(<UsernameFont>{username}</UsernameFont>, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
