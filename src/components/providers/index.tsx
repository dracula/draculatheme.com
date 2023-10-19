"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "jotai";
import { useState } from "react";

const Providers = ({ children }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
