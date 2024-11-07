/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'wine': ['Great Vibes', 'Edwardian Script ITC', 'cursive'],
      },
    },
  },
  plugins: [],
}

