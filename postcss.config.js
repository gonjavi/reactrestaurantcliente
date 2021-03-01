const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer') // agrega prefixer donde sea necesario
  ]
}