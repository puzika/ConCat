import { baseUrl } from "../api/url";
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

export const SESSION_EXPIRED_EVENT = 'auth:session_expired';

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

const refreshClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { 
  config: InternalAxiosRequestConfig, 
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void, 
  reject: (error: AxiosError | null) => void 
}[] = [];

const processQueue = (error: AxiosError | null, success = false) => {
  failedQueue.forEach((prom) => {
    if (success) {
      apiClient(prom.config)
        .then((res) => prom.resolve(res))
        .catch((err) => prom.reject(err));
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        await refreshClient.post('/auth/refresh');

        isRefreshing = false;
        processQueue(null, true);

        return apiClient(originalRequest);
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          isRefreshing = false;
          processQueue(refreshError, false);
        }

        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error)
  }
);

export { apiClient };