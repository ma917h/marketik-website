import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#080808",
        white: "#F5F2EE",
        red: {
          DEFAULT: "#E8000F",
          dark: "#c0000d",
        },
        gray: {
          DEFAULT: "#1a1a1a",
          mid: "#2e2e2e",
          light: "#888888",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        dm: ["var(--font-dm-serif)", "serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        noto: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
