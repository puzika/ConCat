import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore, combineReducers, type Reducer } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

type TestWrapperProps = {
  children: ReactNode | ReactNode[],
  reducers?: Record<string, Reducer>,
}

export const TestWrapper = ({ children, reducers }: TestWrapperProps) => {
  const rootReducer = combineReducers(reducers);
  const store = configureStore({ reducer: rootReducer });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          { children }
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  )
}