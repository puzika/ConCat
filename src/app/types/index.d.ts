type AppStore = typeof import('../store').store;
declare type RootState = ReturnType<AppStore['getState']>;
declare type AppDispatch = AppStore['dispatch'];