import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        matcha: "#426B1F",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "1rem",
      full: "9999px",
    },
    divideWidth: {
      DEFAULT: "1px",
      "0": "0",
      "2": "2px",
      "3": "3px",
      "4": "4px",
      "6": "6px",
    },
  },
  plugins: [],
};
export default config;
