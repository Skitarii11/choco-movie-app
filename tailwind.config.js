/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFF5F5",
        secondary: "#FFE0E0",
        accent: "#FF6B6B",
        darkText: "#4A4A4A",
        lightText: "#8D8D8D",
      },
    },
  },
  plugins: [],
};
