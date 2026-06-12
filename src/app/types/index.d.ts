import 'axios';

type AppStore = typeof import('../store').store;
declare type RootState = ReturnType<AppStore['getState']>;
declare type AppDispatch = AppStore['dispatch'];
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean,
  }
}