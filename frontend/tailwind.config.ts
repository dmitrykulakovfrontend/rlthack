import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        bottom: "0px -6px 16px 14px #FFF",
        top: "0px 0px 16px 10px #FFF",
        pixelatedFix: "0 0 1px 1px",
        blue: "0px 1px 2px 1px rgba(0, 65, 203, 0.20)",
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        exo2: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
