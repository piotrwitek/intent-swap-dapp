import { makeSDK } from "@summer_fi/sdk-client";

const SDK_API_URL = process.env.SDK_API_URL;
if (!SDK_API_URL) {
  throw new Error("SDK_API_URL is not defined in the environment variables.");
}

export const sdkClient = makeSDK({
  apiDomainUrl: SDK_API_URL,
  logging: process.env.NODE_ENV === "development",
});
