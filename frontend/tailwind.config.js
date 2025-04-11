/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

  module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Red Hat Display', 'sans-serif'],
        },
        colors: {
          prussian_blue: {
            DEFAULT: '#012a4a',
            100: '#00090f',
            200: '#00111e',
            300: '#011a2d',
            400: '#01233c',
            500: '#012a4a',
            600: '#025ca1',
            700: '#048df6',
            800: '#54b4fc',
            900: '#aad9fe'
          },
          indigo_dye: {
            DEFAULT: '#014f86',
            100: '#000f1a',
            200: '#001f35',
            300: '#002e4f',
            400: '#013e6a',
            500: '#014f86',
            600: '#0179cf',
            700: '#1ea0fe',
            800: '#69c0fe',
            900: '#b4dfff'
          },
          ucla_blue: {
            DEFAULT: '#2a6f97',
            100: '#09161e',
            200: '#112d3c',
            300: '#1a435b',
            400: '#225979',
            500: '#2a6f97',
            600: '#3a93c7',
            700: '#6baed5',
            800: '#9cc9e3',
            900: '#cee4f1'
          },
          cerulean: {
            DEFAULT: '#2c7da0',
            100: '#091920',
            200: '#123240',
            300: '#1a4b60',
            400: '#236480',
            500: '#2c7da0',
            600: '#3fa1ca',
            700: '#6fb8d8',
            800: '#9fd0e5',
            900: '#cfe7f2'
          },
          air_force_blue: {
            DEFAULT: '#468faf',
            100: '#0e1d23',
            200: '#1c3946',
            300: '#2a5669',
            400: '#38738c',
            500: '#468faf',
            600: '#67a7c3',
            700: '#8dbdd2',
            800: '#b3d3e1',
            900: '#d9e9f0'
          },
          air_superiority_blue: {
            DEFAULT: '#61a5c2',
            100: '#10222a',
            200: '#214454',
            300: '#31677e',
            400: '#4189a7',
            500: '#61a5c2',
            600: '#81b7ce',
            700: '#a0c9da',
            800: '#c0dbe6',
            900: '#dfedf3'
          },
          sky_blue: {
            DEFAULT: '#89c2d9',
            100: '#112b35',
            200: '#22566a',
            300: '#34819f',
            400: '#52a6c7',
            500: '#89c2d9',
            600: '#a0cee0',
            700: '#b7dae8',
            800: '#cfe6f0',
            900: '#e7f3f7'
          },
          light_blue: {
            DEFAULT: '#a9d6e5',
            100: '#12333d',
            200: '#25657b',
            300: '#3798b8',
            400: '#6bb9d3',
            500: '#a9d6e5',
            600: '#badeea',
            700: '#cbe6f0',
            800: '#dceff5',
            900: '#eef7fa'
          }
        }
      }
    },
    plugins: []
  }