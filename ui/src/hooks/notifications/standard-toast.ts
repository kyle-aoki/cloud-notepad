import { toast } from 'react-toastify';

export const StandardToast = (message: any) => {
  toast(message, {
    type: 'dark',
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
