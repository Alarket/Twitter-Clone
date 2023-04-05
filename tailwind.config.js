/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        twitter: '#00ADED'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

