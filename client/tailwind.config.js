/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    extend: {
      colors: {
        'primary': "#E3E0F3",
        'buttonback': '#BDD1D0',
        'secondary': '#fff',
         'tertiary': '#E7F6F2',
         'googBack': "#4285F4",
         'fbBack': '#4267B2',
         'inputBack': '#D9D9D9',
         'aquamarine': '#52ab98',
         'grayout': "#f2f2f2",
         'conColor': "#c8d8e4",
         'messageColorOwn': "#a2d5c6"
      }
    },
  },
  plugins: [ require('flowbite/plugin')],
}
