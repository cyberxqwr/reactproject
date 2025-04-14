/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bermuda: {
          DEFAULT: '#4c6fbb',
          '600': '#405d9f',
          '700': '#344b83',

        },
        
      },
    },
  },
  plugins: [],
}

