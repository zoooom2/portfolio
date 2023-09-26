/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baz: {
          black: '#0A0A0A',
          white: '#F9F8F8',
          danger: '#F95738',
          success: '#566E3D',
          premium: '#B9A44C',
        },
      },
      fontFamily: {
        baz1: ['Poppins', ...defaultTheme.fontFamily.sans],
        baz2: ['Zilla Slab', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        adminHero: ['32px', '48px'],
        adminSelect: ['20px', '30px'],
      },
    },
  },
  plugins: [],
};
