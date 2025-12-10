/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f7',
          100: '#b3e9e8',
          200: '#80dbd9',
          300: '#4dcdca',
          400: '#1abfbb',
          500: '#00B7B5',
          600: '#009694',
          700: '#007573',
          800: '#005452',
          900: '#003331',
        },
        admin: {
          50: '#e6f2f7',
          100: '#b3dae8',
          200: '#80c2d9',
          300: '#4daaca',
          400: '#1a92bb',
          500: '#005461',
          600: '#004350',
          700: '#00323f',
          800: '#00212e',
          900: '#00101d',
        }
      }
    },
  },
  plugins: [],
}
