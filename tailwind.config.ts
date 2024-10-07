import type { Config } from "tailwindcss";
import colors, { white } from "tailwindcss/colors";
import tailwindColors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: colors.white,
      amber: colors.amber,
      lime: colors.lime,
      teal: colors.teal,
      sky: colors.sky,
      violet: colors.violet,
      pink: colors.pink,
      gray: colors.gray,
      rose: colors.rose,
      primary: "var(--primary)",
      light: "var(--light)",
    },
    extend: {
      colors: {
        colors: {
          primary: colors.amber,
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
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
