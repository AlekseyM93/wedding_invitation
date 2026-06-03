import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          cream: "#F7F3EF",
          pearl: "#FBF9F7",
          beige: "#E7DFD2",
          gold: "#DCC7A1",
          accent: "#A78D6F",
          sage: "#B8B89A",
          brown: "#6B4F3A",
          ink: "#4E392B",
          line: "#E5DED8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        luxury: "36px",
        soft: "24px",
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(78, 57, 43, 0.08)",
        card: "0 18px 50px rgba(78, 57, 43, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
