const plugin = require('tailwindcss/plugin')

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-x-10': {
      transform: 'rotateY(10deg)',
    },
    '.rotate-x-20': {
      transform: 'rotateY(20deg)',
    }
  })
})

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'callout': ['Carter One'],
      'dongle': ['Dongle'],
    },
  },
  plugins: [
    rotateY,
  ],
}
