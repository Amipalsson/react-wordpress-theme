/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
    './src/**/*.{js,jsx,ts,tsx}',
    "./*.php",
		"./src/css/*.css",
		"./src/js/*.js",
		"./functions/*.php",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
