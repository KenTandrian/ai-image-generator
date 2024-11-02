import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-pjs)"],
        sans: ["var(--font-pjs)", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xs: "360px",
      "3xl": "1920px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
} as Config;
