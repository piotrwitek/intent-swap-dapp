import { withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi(
  {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  },
  {
    // AccountKit UI theme customizations (optional)
  }
);
