/** @type {import('tailwindcss').Config} */
module.exports = {
  
  // Important: include expo-router's `app/` directory, otherwise NativeWind
  // won't generate styles for your screens even if IntelliSense shows them.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}