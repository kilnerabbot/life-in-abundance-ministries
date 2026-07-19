import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "abundance-blue": "#1B5A7D",
        "abundance-leaf": "#7AB648",
        "abundance-green": "#3E7C3A",
        "abundance-offwhite": "#F7F7F2",
        "abundance-night": "#0B1D28",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
