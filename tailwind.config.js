/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // White background
        secondary: {
          DEFAULT: "#F8BBD0", // Light pink for cards/elements
          100: "#FCE4EC",
          200: "#F48FB1",
        },
        accent: {
          DEFAULT: "#EC407A", // Brighter pink for highlights
          100: "#F06292",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        gold: "#FFD700", // For the "Gold Member" badge
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
