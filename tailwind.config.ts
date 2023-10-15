import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
} as Config;
