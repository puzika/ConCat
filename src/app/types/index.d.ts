import 'axios';

declare global {
  type AppStore = typeof import('../store').store;
  type RootState = ReturnType<AppStore['getState']>;
  type AppDispatch = AppStore['dispatch'];
}

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean,
  }
}