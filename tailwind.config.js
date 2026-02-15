/** @type {import('tailwindcss/types').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
  extend: {
    fontFamily: {
      playwrite: ['"Playwrite NZ Basic"', 'cursive'],
      dancingscript: ['"Dancing Script"', 'cursive'],
    },
  },
},
  plugins: [],
}


