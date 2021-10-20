/* eslint-disable no-undef */
import axios from 'axios'
// import { NOTIFICATION_TYPES } from '../constants/app';
// import { notification } from './notification';
import { getUser } from 'utils/helpers';
import history from 'utils/history'
const baseUrl = `${ process.env.REACT_APP_API_URL }/v1`;

const axiosInstance =  axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'x-knetikcloud-appid': 'cuentas'
    }
})
axiosInstance.interceptors.request.use(function (config) {
    const token = getUser() && getUser().accessToken;
    config.headers.Authorization =  token ? `Bearer ${ token }` :  null ;
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    if (response.data && response.data.error) {
        return Promise.reject(response);
    }
    return response;
}, (error) => {
    if(error.response.status === 401){
        //notification(NOTIFICATION_TYPES.ERROR, error.response.data.message)
        localStorage.clear()
        history.push('/login')
        //return Promise.reject(error);
    }
    if(!error.response) {
        // notification(NOTIFICATION_TYPES.ERROR, error.message)
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default axiosInstance;