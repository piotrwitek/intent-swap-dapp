import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { config } from "dotenv";
// Load environment variables from .env file
config({
  path: ".env.local",
  debug: process.env.NODE_ENV === "development",
  override: true,
});
console.log("NODE_ENV", process.env.NODE_ENV);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {
      SDK_API_URL: process.env.SDK_API_URL,
    },
  },
  server: {
    port: 3000,
  },
});
