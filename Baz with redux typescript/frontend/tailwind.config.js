/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
