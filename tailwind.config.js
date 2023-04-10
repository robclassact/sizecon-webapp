/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        sizecon: {
          ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],
          'base-100': '#EFEFEF'
          // '.btn-twitter': {
          //   'background-color': '#1EA1F1',
          //   'border-color': '#1EA1F1',
          // },
          // '.btn-twitter:hover': {
          //   'background-color': '#1C96E1',
          //   'border-color': '#1C96E1',
          // },
        }
      }
    ]
  }
}
