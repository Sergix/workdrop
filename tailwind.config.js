/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      colors: {
        foreground: '#121212',
        background: '#FAFAFA',
        action: '#1C3FFD',
        success: '#4FED77',
        warning: '#FFD10F',
        info: {
          default: '#732DD9',
          accessible: '#702AD6',
        },
        error: {
          default: '#F23034',
          accessible: '#E52327',
        },
      },
      width: {
        toast: '22rem',
      },
      fontFamily: {
        sans: 'TT Hoves, Helvetica, Arial, sans-serif',
      },
      fontSize: {
        'large-screens': '20px',
      },
      boxShadow: {
        soft: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
      zIndex: {
        'neg-1': '-1',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        h1: { fontWeight: config('theme.fontWeight.bold') },
        h2: { fontWeight: config('theme.fontWeight.semibold') },
        h3: { fontWeight: config('theme.fontWeight.semibold') },
        body: {
          fontFamily: config('theme.fontFamily.sans'),
          backgroundColor: config('theme.colors.background'),
        },
      })
    }),
  ],
}
