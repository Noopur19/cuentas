import { toast } from 'react-toastify';
export const notification = (type, message) => {
    toast[ type ](message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
