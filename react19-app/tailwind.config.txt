import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // tailwind:
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      blue: colors.blue,
      purple: colors.purple,
      emerald: colors.emerald,
      // own:
      orange: {
        DEFAULT: "#E29F28",
      },
      red: {
        DEFAULT: "#D54418",
      },
      orange_2: {
        DEFAULT: "#F89223",
        200: "#f6e3cf",
        500: "#E18521",
      },
      green: {
        DEFAULT: "#6FB43F",
        200: "#9ccf77",
      },
      lima: {
        50: "#f2f9ec",
        100: "#e3f2d5",
        200: "#c8e7af",
        300: "#a6d581",
        400: "#86c259",
        500: "#6fb43f",
        600: "#4f852b",
        700: "#3d6625",
        800: "#345222",
        900: "#2e4621",
        950: "#15260d",
      },
      goldgray: {
        DEFAULT: "#F4F3F0",
      },
    },
    extend: {
      fontFamily: {
        space: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        inter: ["inter", ...defaultTheme.fontFamily.sans],
        barlow: ["barlow", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      sm: "767px",
      // => @media (min-width: 767px) { ... }

      md: "1024px",
      // => @media (min-width: 960px) { ... }

      lg: "1200px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};

// Rubik Doodle Shadow
