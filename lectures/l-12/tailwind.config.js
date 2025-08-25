/** @type {import('tailwindcss').Config} */
module.exports = {
  // Sier hvor Tailwind skal lete etter klasser
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
