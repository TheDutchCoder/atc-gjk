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
    minHeight: {
      '6': '1.5rem',
      '7': '1.75rem',
    },
    // },
    extend: {
      boxShadow: {
        'lg': '0 2px 2px 0 rgba(31, 41, 55, 0.5)',
        'block': '0 2px 3px 1px rgba(31, 41, 55, 0.3), inset 0 -4px 0 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    rotateY,
  ],
}
