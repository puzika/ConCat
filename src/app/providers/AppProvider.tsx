import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RealtimeProvider } from "./realtime";
import { store } from "../store";
import axios from "axios";

type ProvidersProps = {
  children?: ReactNode | ReactNode[],
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError(error) {
        if (
          axios.isAxiosError(error) && 
          error.response?.status === 401 &&
          window.location.pathname !== '/auth/signin'
        ) {
          window.location.href = 'auth/signin';
          return false;
        }

        return true;
      }
    }
  }
});

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <RealtimeProvider>
        <QueryClientProvider client={client}>
          {children}
        </QueryClientProvider>
      </RealtimeProvider>
    </Provider>
  )
}