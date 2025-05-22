/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        navy: '#000080',
        green: {
          india: '#138808'
        },
        ashoka: {
          blue: '#0F52BA'
        }
      }
    },
  },
  plugins: [],
};