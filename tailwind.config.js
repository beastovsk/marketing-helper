/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './modules/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: true
  },
  theme: {
    transitionDuration: {
      DEFAULT: '380ms',
      0: '0s',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    transitionProperty: {
      none: 'none',
      DEFAULT: 'all',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform'
    },
    container: {
      padding: '1rem',
      center: true
    },
    extend: {
      colors: {
        primary: {
          500: '#4880ff'
        },
        gray: {
          500: '#BABABB'
        },
        darkText: '#fff',
        whiteText: '#fff'
      },
      transitionDuration: {
        380: '380ms'
      }
    },

    screens: {
      lg: {max: '1024px'},
      md: {max: '990px'},
      sm: {max: '576px'}
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss'), require('autoprefixer')],
  darkMode: 'class'
};
