// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        editorial:['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins:[
    require('@tailwindcss/typography'),
  ],
}