import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: "#252525",
        primary: {
          default: "#83daff",
          foreground: "#83daff",
          muted: "#d2f1ff"
        },
      },
      boxShadow: {
        '3xl': '0 5px 60px 20px',
        '3xl-hover': '0 5px 60px 0px',
      }
    },
  },
  plugins: [],
};
export default config;
