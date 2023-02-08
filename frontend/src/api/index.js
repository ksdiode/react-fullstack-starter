import axios from 'axios';
import store from '../store';

let instance = axios.create({}); // axios 인스턴스 생성

function setInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      const { user } = store.getState();
      if (user.token) {
        config.headers.Authorization = user.token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return instance;
}

setInterceptors(instance);

export default instance;
