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
    screens: {
      '3xl': '2560px',
      '4k': '3840px',
    },
  },
},
  plugins: [],
}
// module.exports = {
//   theme: {
//     extend: {
//       screens: {
//         "3xl": "2560px",   // 4K start
//         "4k": "3840px",    // real 4K TVs
//       },
//     },
//   },
// };


