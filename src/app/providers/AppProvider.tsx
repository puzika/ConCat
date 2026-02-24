import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../store";

type ProvidersProps = {
  children?: ReactNode | ReactNode[],
}

const client = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}