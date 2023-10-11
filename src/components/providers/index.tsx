"use client";

import { Provider } from "jotai";

const Providers = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default Providers;
