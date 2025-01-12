import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/user';
import { BACKEND_URL, REQUEST_TIMEOUT } from './constants';
import { TOKEN_HEADER } from '@/constants/token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token !== '') {
      config.headers[TOKEN_HEADER] = token;
    }

    return config;
  });

  return api;
};
