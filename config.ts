import { createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { base, alchemy } from "@account-kit/infra";

export const accountKitConfig = createConfig(
  {
    transport: alchemy({ apiKey: "sZBoRUa88xNMpKyAyGXzH" }),
    chain: base,
    ssr: false,
  },
  {
    auth: {
      sections: [
        [{ type: "external_wallets" }],
        [
          { type: "passkey" },
          { type: "social", authProviderId: "google", mode: "popup" },
        ],
      ],
      addPasskeyOnSignup: true,
    },
  }
);

export const queryClient = new QueryClient();
