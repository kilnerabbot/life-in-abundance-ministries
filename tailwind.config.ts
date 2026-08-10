import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand core — extracted from the church signage. Do not replace.
        "abundance-blue": "#1B5A7D",
        "abundance-leaf": "#7AB648",
        "abundance-green": "#3E7C3A",
        "abundance-offwhite": "#F7F7F2",
        "abundance-night": "#0B1D28",
        // Derived tints/shades — same identity, wider range for editorial depth.
        brand: {
          50: "#F2F7FA",
          100: "#E1EDF3",
          200: "#B9D5E2",
          300: "#8DBACE",
          400: "#4E8CA8",
          500: "#1B5A7D", // primary
          600: "#164B69",
          700: "#123B53",
          800: "#0E2E41",
          900: "#0B1D28", // night
        },
        leaf: {
          50: "#F3F9EC",
          100: "#E3F1D3",
          200: "#C6E2A8",
          300: "#A5D078",
          400: "#7AB648", // accent
          500: "#63A233",
          600: "#3E7C3A", // dark green
          700: "#356A32",
        },
        sand: {
          50: "#FBFAF6",
          100: "#F7F7F2", // off-white
          200: "#EDEBE1",
          300: "#DED9C8",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale — clamp(min, preferred, max).
        "fluid-sm": "clamp(0.875rem, 0.84rem + 0.18vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.25vw, 1.15rem)",
        "fluid-lg": "clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem)",
        "fluid-xl": "clamp(1.6rem, 1.3rem + 1.4vw, 2.4rem)",
        "fluid-2xl": "clamp(2.2rem, 1.6rem + 2.8vw, 3.75rem)",
        "fluid-3xl": "clamp(2.8rem, 1.8rem + 4.6vw, 5.5rem)",
        "fluid-hero": "clamp(3.2rem, 2rem + 6vw, 8rem)",
      },
      maxWidth: {
        editorial: "78rem",
        prose: "42rem",
      },
      boxShadow: {
        // Soft-UI Evolution — softer than flat, clearer than neumorphism.
        soft: "0 2px 8px -2px rgba(11,29,40,0.08), 0 8px 24px -8px rgba(11,29,40,0.10)",
        "soft-lg": "0 8px 20px -6px rgba(11,29,40,0.12), 0 24px 48px -16px rgba(11,29,40,0.16)",
        lift: "0 12px 32px -8px rgba(27,90,125,0.28)",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.33, 0, 0.19, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
