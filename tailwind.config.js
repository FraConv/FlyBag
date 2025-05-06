/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0,0,0,0.3)',
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

