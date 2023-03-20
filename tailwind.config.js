/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
      colors: {
        primary: "#36B32D",
        secondary: "#E8A897 ",
      },
    },
  },
  plugins: [],
};
