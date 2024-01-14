/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TITLE/TEXT/FONT COLOR
      colors: {
        lightText: "rgb(255, 255, 255)",
        darkText: "rgb(35, 35, 35)",

        navLight: "rgb(0, 133, 250)",
        // navLight: "rgb(255, 255, 255)",
        navDark: "rgb(75, 75, 75)",

        tabLight: "rgb(255, 255, 255)",
        tabDark: "rgb(45, 45, 45)",

        // bgDarkGradient: "rgb(45, 45, 45)",
      },
      // BODY GRADIENT COLOR
      backgroundImage: {
        // bgLightGradient: "linear-gradient(to right, rgb(255, 255, 255) 10%, rgb(209, 216, 255) 100%)",
        bgLightGradient: "linear-gradient(to right, rgb(250, 250, 250) 10%, rgb(245, 245, 245) 90%)",
        // bgDarkGradient: "linear-gradient(to bottom right, rgb(74, 85, 104) 10%, rgb(26, 32, 44) 90%)",
        bgDarkGradient: "linear-gradient(to right, rgb(25, 25, 25) 10%, rgb(35, 35, 35) 90%)"

      }
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Open Sans', 'serif'],
    },
  },
  plugins: [],
}