import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        secondary: "var(--secondary-color)",
        "main-dark": "var(--main-dark-color)",
        "main-transparent": "var(--main-transparent-color)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 500ms linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
