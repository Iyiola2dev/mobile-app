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
    extend: {
      colors:{
        primary : "#030014",
        secondary : "#151312",
        light : {
          100 : "#D6C6FF",
          200 : "#A8B5DB",
          300 : "#9CA4AB"
        },
        dark : {
          100 : "#221f3d",
          200 : "#0f0d23",
        }
        
      }
    },
  },
  plugins: [],
}