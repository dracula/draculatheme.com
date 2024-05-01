"use client";

import { Provider } from "jotai";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({ children }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
