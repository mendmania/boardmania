import router from '@/router';
import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'http://localhost:4000/',
});

// use for request start
axiosIns.interceptors.request.use((request) => request);

axiosIns.interceptors.response.use(
  (response) => {
    if (response.config && response.config.requestToastId) {
      //   show toast
    }

    return response;
  },
  (error) => {
    const errorResponseData = error.response;

    console.log('error', errorResponseData);

    if (errorResponseData) {
      if (errorResponseData.status === 404) {
        router.push('/error-404');
      } else if (errorResponseData.status === 500) {
        router.push('/error-500');
      } else if (errorResponseData.status === 401) {
        router.push('/no-access');
      }
    }

    return Promise.reject(error.response);
  },
);

export default axiosIns;
