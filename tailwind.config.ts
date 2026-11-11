import type { Config } from "tailwindcss";

/**
 * Steelsetu design tokens (PRD Part L).
 * Palette: Steel Blue #4682B4, Deep Navy #172B3A, Grey #808080,
 * Background #F4F6F8, White #FFFFFF, Charcoal #202A33.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        steel: {
          blue: "#4682B4",
          navy: "#172B3A",
          charcoal: "#202A33",
          grey: "#808080",
          bg: "#F4F6F8",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
