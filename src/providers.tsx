import { type PropsWithChildren } from "react";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { accountKitConfig, queryClient } from "../config";

export const Providers = ({ children }: PropsWithChildren<object>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={accountKitConfig}
        queryClient={queryClient}
      >
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
