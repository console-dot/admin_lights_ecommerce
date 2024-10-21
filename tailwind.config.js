/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'colored': 'inset -2px 0px 11px -5px var(--tw-shadow-color)',
        'login': 'inset -2px 0px 11px -5px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}

