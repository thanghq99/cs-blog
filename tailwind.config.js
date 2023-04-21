const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        sans: ["stratum2", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fadeInLeft: "fadeInLeft 1s",
        delayAppearance: "delayAppearance 1s 0.5s forwards",
      },
      keyframes: {
        fadeInLeft: {
          "0%": { opacity: "0%", transform: "translate(120px,0)" },
          // "30%": { opacity: "40%" },
          "100%": { opacity: "100%", transform: "translate(0,0)" },
        },
        delayAppearance: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
};
