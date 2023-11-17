const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.rose,
        neutral: colors.stone,
        alert: colors.amber,
        danger: colors.red
      }
    },
  },
  plugins: [],
};
