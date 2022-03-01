const plugin = require('tailwindcss/plugin')

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-x-10': {
      transform: 'rotateX(5deg) scale(1.1)',
    },
    '.-rotate-x-10': {
      transform: 'rotateX(-5deg) scale(0.9)',
    },
    '.rotate-x-20': {
      transform: 'rotateX(20deg) scale(1.1)',
    },
    '.rotate-y-10': {
      transform: 'rotateY(10deg) scale(1.1)',
    },
    '.rotate-y-20': {
      transform: 'rotateY(20deg) scale(1.1)',
    },
  })
})

// Commit
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'callout': ['Carter One'],
      'dongle': ['Dongle'],
    },
    // extend: {
    transitionTimingFunction: {
      'boing': 'cubic-bezier(.7,-1.82,.47,2.84)',
    },
    // },
  },
  plugins: [
    rotateY,
  ],
}
